import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentController } from './v1/payment.controller';
import { PaymentService } from './v1/payment.service';
import { Settlement } from './settlement.sql.model';

@Module({
  imports: [SequelizeModule.forFeature([Settlement])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
