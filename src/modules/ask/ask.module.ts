import { Global, Module } from '@nestjs/common';
import { AskService } from './ask.service';
import { AskController } from './ask.controller';
import { PaymentModule } from '@modules/payment/payment.module';

@Global()
@Module({
  imports: [PaymentModule],
  controllers: [AskController],
  providers: [AskService],
  exports: [AskService],
})
export class AskModule {}
