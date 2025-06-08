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
export class Support extends Model {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  caseNumber: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  date: string; // "11/27/2024"

  @AllowNull(false)
  @Column(DataType.STRING)
  createdTime: string; // "12:20 pm"

  @AllowNull(false)
  @Column(DataType.STRING)
  category: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  subject: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  corporateName: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  modeOfPayment: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  resolution: string;
}
