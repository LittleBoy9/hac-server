import { Injectable } from '@nestjs/common';
import { Settlement } from '../settlement.sql.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Settlement)
    private settlementRepo: typeof Settlement,
  ) {}
}
