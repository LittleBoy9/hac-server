import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ paranoid: true })
export class Settlement extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  transactionId: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  merchantDisplayName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  txnStatusName: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  acquirerName: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  issuerName: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  paymentModeId: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  paymentModeName: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  cardTypeAssociationName: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  amount: number;

  @Column(DataType.BOOLEAN)
  isAggregator: boolean;

  @Column(DataType.BOOLEAN)
  isReversal: boolean;

  @Column(DataType.STRING)
  transactionStartDateTime: string;

  @Column(DataType.FLOAT)
  txnRefundAmt: number;

  @Column(DataType.STRING)
  batchId: string;

  @Column(DataType.STRING)
  nodalAccountBank: string;

  @Column(DataType.FLOAT)
  actualTxnAmount: number;

  @Column(DataType.FLOAT)
  refundAmount: number;

  @Column(DataType.FLOAT)
  bankChargeAmount: number;

  @Column(DataType.FLOAT)
  mdrCharge: number;

  @Column(DataType.FLOAT)
  mdrTax: number;

  @Column(DataType.FLOAT)
  platformFee: number;

  @Column(DataType.FLOAT)
  mardAmount: number;

  @Column(DataType.FLOAT)
  additonalTaxes: number;

  @Column(DataType.FLOAT)
  bankCommision: number;

  @Column(DataType.FLOAT)
  bankServiceTax: number;

  @Column(DataType.FLOAT)
  amountToBeDeductedInAdditionToBankCharges: number;

  @Column(DataType.BOOLEAN)
  isNotOnSellRate: boolean;

  @AllowNull(true)
  @Column(DataType.STRING)
  convenienceFeesAmtInPaise: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  convenienceFeesAdditionalAmtInPaise: string;

  @Column(DataType.FLOAT)
  settlementAmount: number;

  @Column(DataType.STRING)
  sds: string;

  @Column(DataType.STRING)
  sdscycle: string;

  @Column(DataType.STRING)
  programName: string;

  @Column(DataType.STRING)
  axisPayoutCreated: string;

  @Column(DataType.STRING)
  payoutStatus: string;

  @Column(DataType.STRING)
  payoutNodalAcc: string;
}
