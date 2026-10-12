import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { CredoInstallmentController } from './controllers/credo-installment.controller';
import { CredoInstallmentService } from './services/credo-installment.service';
import { OrderModule } from '../orders/order.module';
import { EmailModule } from '../email/email.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../orders/schemas/order.schema';
import { CredoInstallmentSyncService } from './services/credo-installment-sync.service';

@Module({
  imports: [
    OrderModule,
    EmailModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [PaymentsController, CredoInstallmentController],
  providers: [
    PaymentsService,
    CredoInstallmentService,
    CredoInstallmentSyncService,
  ],
  exports: [PaymentsService, CredoInstallmentService],
})
export class PaymentsModule {}
