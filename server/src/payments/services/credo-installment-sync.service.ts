import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../../orders/schemas/order.schema';
import { OrdersService } from '../../orders/services/orders.service';
import { CredoInstallmentService } from './credo-installment.service';

const TERMINAL_CREDO_STATUSES = [
  'credo_installment_rejected',
  'credo_installment_cancelled',
];

@Injectable()
export class CredoInstallmentSyncService implements OnApplicationBootstrap {
  private readonly logger = new Logger(CredoInstallmentSyncService.name);
  private isSyncing = false;

  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private readonly credoInstallmentService: CredoInstallmentService,
    private readonly ordersService: OrdersService,
  ) {}

  onApplicationBootstrap(): void {
    // Run once after deployment so existing pending installments are reconciled.
    void this.syncPendingInstallments('startup');
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async syncPendingInstallmentsOnSchedule(): Promise<void> {
    await this.syncPendingInstallments('scheduled');
  }

  async syncPendingInstallments(trigger: 'startup' | 'scheduled' = 'scheduled') {
    if (this.isSyncing) {
      return;
    }

    this.isSyncing = true;
    let checkedCount = 0;
    let updatedCount = 0;
    let failedCount = 0;

    try {
      const pendingOrders = await this.orderModel
        .find({
          isPaid: false,
          paymentMethod: 'CredoInstallment',
          externalOrderId: { $type: 'string', $ne: '' },
          'paymentResult.status': { $nin: TERMINAL_CREDO_STATUSES },
        })
        .sort({ createdAt: 1 })
        .limit(100)
        .exec();

      for (const order of pendingOrders) {
        checkedCount += 1;

        try {
          const statusResponse =
            await this.credoInstallmentService.getInstallmentStatus(
              order.externalOrderId,
            );

          if (statusResponse.status !== 200 || statusResponse.data === null) {
            continue;
          }

          const statusId = statusResponse.data;
          const isPaidStatus =
            this.credoInstallmentService.isInstallmentSuccessful(statusId) ||
            this.credoInstallmentService.isReadyForShipment(statusId);

          if (isPaidStatus) {
            await this.ordersService.updateOrderByExternalId(
              order.externalOrderId,
              {
                id: order.externalOrderId,
                status: 'COMPLETED',
                update_time: new Date().toISOString(),
                email_address: statusResponse.info?.Mobile || '',
              },
            );
            updatedCount += 1;
            continue;
          }

          if (this.credoInstallmentService.isInstallmentFailed(statusId)) {
            const isAlreadyCancelled = order.status === 'cancelled';

            if (!isAlreadyCancelled) {
              await this.ordersService.cancelOrder(
                order._id.toString(),
                `Credo installment failed (status ${statusId})`,
              );
            }

            const terminalStatus =
              statusId === 6
                ? 'credo_installment_rejected'
                : 'credo_installment_cancelled';

            await this.orderModel.updateOne(
              { _id: order._id, isPaid: false },
              { $set: { 'paymentResult.status': terminalStatus } },
            );
            failedCount += 1;
          }
        } catch (error) {
          this.logger.error(
            `Credo sync failed for ${order.orderNumber || order._id}: ${
              error instanceof Error ? error.message : String(error)
            }`,
          );
        }
      }

      this.logger.log(
        `Credo ${trigger} sync finished: checked=${checkedCount}, paid=${updatedCount}, failed=${failedCount}`,
      );
    } catch (error) {
      this.logger.error(
        `Credo ${trigger} sync could not load pending orders: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    } finally {
      this.isSyncing = false;
    }
  }
}
