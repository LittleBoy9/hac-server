import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';

@Controller({
  path: 'payment',
  version: '1',
})
@ApiTags('Payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
}
