import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { CredoInstallmentController } from './controllers/credo-installment.controller';
import { CredoInstallmentService } from './services/credo-installment.service';
import { OrderModule } from '../orders/order.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [OrderModule, EmailModule],
  controllers: [PaymentsController, CredoInstallmentController],
  providers: [PaymentsService, CredoInstallmentService],
  exports: [PaymentsService, CredoInstallmentService],
})
export class PaymentsModule {}
