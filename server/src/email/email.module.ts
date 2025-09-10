import { Module } from '@nestjs/common';
import { EmailService } from './services/email.services';
import { TestEmailController } from './controllers/test-email.controller';

@Module({
  controllers: [TestEmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
