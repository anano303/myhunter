import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import {
  CredoInstallmentService,
  CredoProduct,
} from '../services/credo-installment.service';
import { OrdersService } from '@/orders/services/orders.service';

interface CreateCredoInstallmentDto {
  orderId: string;
  products: Array<{
    id: string;
    title: string;
    amount: number;
    price: number;
  }>;
}

interface NormalizedCredoProduct {
  id: string;
  title: string;
  amount: number;
  price: number;
}

interface CredoProductUnit {
  id: string;
  title: string;
  priceInCents: number;
}

@Controller('payments/credo')
export class CredoInstallmentController {
  private readonly logger = new Logger(CredoInstallmentController.name);

  constructor(
    private readonly credoInstallmentService: CredoInstallmentService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post('installment/create')
  async createInstallmentOrder(@Body() body: CreateCredoInstallmentDto) {
    try {
      const { orderId, products } = body;

      if (!orderId) {
        throw new BadRequestException('orderId is required');
      }

      if (!products?.length) {
        throw new BadRequestException('At least one product is required');
      }

      for (const product of products) {
        if (
          !product.id ||
          !product.title ||
          !product.amount ||
          !product.price
        ) {
          throw new BadRequestException(
            'Each product must have id, title, amount, and price',
          );
        }

        if (product.amount <= 0) {
          throw new BadRequestException('Product quantity must be positive');
        }

        if (product.price <= 0) {
          throw new BadRequestException('Product price must be positive');
        }
      }

      const order = await this.ordersService.findById(orderId);
      const orderProducts: NormalizedCredoProduct[] =
        order.orderItems?.map((item: any) => ({
          id: item.productId,
          title: item.name,
          amount: item.qty,
          price: item.price,
        })) || [];
      const normalizedProducts = orderProducts.length
        ? orderProducts
        : products;
      const productUnits: CredoProductUnit[] = normalizedProducts.flatMap(
        (product) =>
          Array.from({ length: product.amount }, (_, index) => ({
            id:
              product.amount > 1
                ? `${product.id}-${index + 1}`
                : product.id,
            title: product.title,
            priceInCents: Math.round(product.price * 100),
          })),
      );
      const productsTotalInCents = productUnits.reduce(
        (total, product) => total + product.priceInCents,
        0,
      );
      const orderTotalInCents = Math.round(Number(order.totalPrice || 0) * 100);
      const adjustmentInCents = orderTotalInCents - productsTotalInCents;
      const adjustmentSign = Math.sign(adjustmentInCents);
      const perUnitAdjustment =
        productUnits.length > 0
          ? Math.trunc(adjustmentInCents / productUnits.length)
          : 0;
      const remainingAdjustment =
        productUnits.length > 0
          ? Math.abs(adjustmentInCents % productUnits.length)
          : 0;

      const orderCode = `MH_${orderId}_${Date.now()}`;
      const credoProducts: CredoProduct[] = productUnits.map(
        (product, index) => ({
          id: product.id,
          title: product.title,
          amount: 1,
          price:
            product.priceInCents +
            perUnitAdjustment +
            (index < remainingAdjustment ? adjustmentSign : 0),
          type: '0',
        }),
      );

      const result =
        await this.credoInstallmentService.createInstallmentOrder(
          orderCode,
          credoProducts,
        );

      try {
        order.externalOrderId = orderCode;
        order.paymentResult = {
          id: orderCode,
          status: 'credo_installment_pending',
          update_time: new Date().toISOString(),
          email_address: order.shippingDetails?.email || '',
        };
        await order.save();
      } catch (error) {
        this.logger.error(
          `Failed to update order with Credo info: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }

      return {
        success: true,
        redirectUrl: result.redirectUrl,
        orderCode: result.orderCode,
      };
    } catch (error) {
      this.logger.error(
        `Credo installment creation error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException(
        error instanceof Error
          ? error.message
          : 'Failed to create installment order',
      );
    }
  }

  @Get('installment/status/:orderCode')
  async getInstallmentStatus(@Param('orderCode') orderCode: string) {
    try {
      if (!orderCode) {
        throw new BadRequestException('orderCode is required');
      }

      const statusResponse =
        await this.credoInstallmentService.getInstallmentStatus(orderCode);

      if (statusResponse.status !== 200 || statusResponse.data === null) {
        return {
          success: false,
          message: statusResponse.message,
          statusCode: statusResponse.status,
        };
      }

      const statusId = statusResponse.data;
      const statusName = this.credoInstallmentService.getStatusName(statusId);
      const isSuccessful =
        this.credoInstallmentService.isInstallmentSuccessful(statusId);
      const isReadyForShipment =
        this.credoInstallmentService.isReadyForShipment(statusId);
      const isFailed =
        this.credoInstallmentService.isInstallmentFailed(statusId);
      const isPending =
        this.credoInstallmentService.isInstallmentPending(statusId);

      if (isReadyForShipment || isSuccessful) {
        await this.ordersService.updateOrderByExternalId(orderCode, {
          id: orderCode,
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          email_address: statusResponse.info?.Mobile || '',
        });
      }

      if (isFailed) {
        const orderId = orderCode.replace(/^MH_/, '').replace(/_\d+$/, '');
        await this.ordersService.cancelOrder(
          orderId,
          `კრედო განვადება ${statusName}`,
        );
      }

      return {
        success: true,
        statusId,
        statusName,
        isSuccessful,
        isReadyForShipment,
        isFailed,
        isPending,
        customerInfo: statusResponse.info || null,
      };
    } catch (error) {
      this.logger.error(
        `Credo installment status error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );

      if (error instanceof BadRequestException) {
        throw error;
      }

      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to check installment status',
      };
    }
  }
}
