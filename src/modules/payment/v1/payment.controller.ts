import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';

@Controller({
  path: 'payment',
  version: '1',
})
@ApiTags('Payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('ingest')
  importFromJson(@Query('type') type: 'settlement' | 'refund' | 'support') {
    return this.paymentService.importFromJson(type);
  }

  @Post('')
  getData(@Body() data: GetQuery) {
    return this.paymentService.getData(data);
  }

  @Get()
  updateDate() {
    this.paymentService.updateRefundDatesInBatches();
  }
}
