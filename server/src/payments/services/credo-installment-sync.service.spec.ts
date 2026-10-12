import { Model } from 'mongoose';
import { Order, OrderDocument } from '../../orders/schemas/order.schema';
import { OrdersService } from '../../orders/services/orders.service';
import { CredoInstallmentService } from './credo-installment.service';
import { CredoInstallmentSyncService } from './credo-installment-sync.service';

describe('CredoInstallmentSyncService', () => {
  const order = {
    _id: { toString: () => 'order-id' },
    orderNumber: 'SSBB00024',
    externalOrderId: 'MH_order-id_123',
    paymentMethod: 'CredoInstallment',
    isPaid: false,
    status: 'pending',
  };

  function createService(statusId: number) {
    const query = {
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([order]),
    };
    const orderModel = {
      find: jest.fn().mockReturnValue(query),
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
    };
    const credoService = {
      getInstallmentStatus: jest.fn().mockResolvedValue({
        status: 200,
        data: statusId,
        info: { Mobile: '555000000' },
      }),
      isInstallmentSuccessful: jest.fn((id: number) => id === 5),
      isReadyForShipment: jest.fn((id: number) => id === 12),
      isInstallmentFailed: jest.fn((id: number) => id === 6 || id === 7),
    };
    const ordersService = {
      updateOrderByExternalId: jest.fn().mockResolvedValue({}),
      cancelOrder: jest.fn().mockResolvedValue({}),
    };

    const service = new CredoInstallmentSyncService(
      orderModel as unknown as Model<OrderDocument>,
      credoService as unknown as CredoInstallmentService,
      ordersService as unknown as OrdersService,
    );

    return { service, orderModel, credoService, ordersService };
  }

  it('marks a successfully completed installment paid', async () => {
    const { service, ordersService } = createService(5);

    await service.syncPendingInstallments('startup');

    expect(ordersService.updateOrderByExternalId).toHaveBeenCalledWith(
      order.externalOrderId,
      expect.objectContaining({ id: order.externalOrderId, status: 'COMPLETED' }),
    );
  });

  it('leaves an installment pending while Credo is still processing it', async () => {
    const { service, ordersService } = createService(14);

    await service.syncPendingInstallments('scheduled');

    expect(ordersService.updateOrderByExternalId).not.toHaveBeenCalled();
    expect(ordersService.cancelOrder).not.toHaveBeenCalled();
  });

  it('cancels a rejected installment and excludes it from future syncs', async () => {
    const { service, orderModel, ordersService } = createService(6);

    await service.syncPendingInstallments('scheduled');

    expect(ordersService.cancelOrder).toHaveBeenCalledWith(
      'order-id',
      'Credo installment failed (status 6)',
    );
    expect(orderModel.updateOne).toHaveBeenCalledWith(
      { _id: order._id, isPaid: false },
      { $set: { 'paymentResult.status': 'credo_installment_rejected' } },
    );
  });
});
