import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentController } from './v1/payment.controller';
import { PaymentService } from './v1/payment.service';
import { Settlement } from './settlement.sql.model';
import { Refund } from './refund.sql.model';
import { Support } from './support.sql.model';

@Module({
  imports: [SequelizeModule.forFeature([Settlement, Refund, Support])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
