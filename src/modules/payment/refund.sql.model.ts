import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
} from 'sequelize-typescript';

@Table({ paranoid: true })
export class Refund extends Model {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  transactionId: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  merchantDisplayName: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  transactionTypeId: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  transactionTypeName: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  txnStatusName: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  txnStepName: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  acquirerName: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  paymentModeName: string;

  @AllowNull(true)
  @Column(DataType.FLOAT)
  amount: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  acquirerResponseCode: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  acquirerResponseDescription: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  transactionResponseCode: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  transactionStartDateTime: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  txnCompletionDateTime: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  timeToComplete: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  transactionResponseMessage: string;

  @AllowNull(true)
  @Column(DataType.BOOLEAN)
  isAggregator: boolean;

  @AllowNull(true)
  @Column(DataType.BOOLEAN)
  isReversal: boolean;

  @AllowNull(true)
  @Column(DataType.STRING)
  pinePgIntegrationModeName: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  convenienceFeesAmtInPaise: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  convenienceFeesGstAmtInPaise: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  convenienceFeesAdditionalAmtInPaise: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  category: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  businessTechnicalDecline: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  saleTxnDateTime: string;
}
