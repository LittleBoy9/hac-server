/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { Settlement } from '../settlement.sql.model';
import { InjectModel } from '@nestjs/sequelize';
import { Refund } from '../refund.sql.model';
import { Support } from '../support.sql.model';
import * as fs from 'fs';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Settlement)
    private settlementRepo: typeof Settlement,
    @InjectModel(Refund)
    private refundRepo: typeof Refund,
    @InjectModel(Support)
    private supportRepo: typeof Support,
    // private sequelize: Sequelize,
  ) {}

  private mapTransaction(record: any): Partial<Settlement> {
    return {
      transactionId: record.transaction_id,
      merchantDisplayName: record.merchant_display_name,
      txnStatusName: record.txn_status_name,
      acquirerName: record.acquirer_name,
      issuerName: record.issuer_name,
      paymentModeId: record.payment_mode_id,
      paymentModeName: record.payment_mode_name,
      cardTypeAssociationName: record.card_type_association_name,
      amount: parseFloat(record.amount),
      isAggregator: record.is_aggregator === 'TRUE',
      isReversal: record.is_reversal === 'TRUE',
      transactionStartDateTime: this.formatDate(
        record.transaction_start_date_time,
      ),
      txnRefundAmt: parseFloat(record.txn_refund_amt || '0'),
      batchId: record.batch_id,
      nodalAccountBank: record.nodal_account_bank,
      actualTxnAmount: parseFloat(record.actual_txn_amount || '0'),
      refundAmount: parseFloat(record.refund_amount || '0'),
      bankChargeAmount: parseFloat(record.bank_charge_amount || '0'),
      mdrCharge: parseFloat(record.mdr_charge || '0'),
      mdrTax: parseFloat(record.mdr_tax || '0'),
      platformFee: parseFloat(record.platform_fee || '0'),
      mardAmount: parseFloat(record.mard_amount || '0'),
      additonalTaxes: parseFloat(record.additonal_taxes || '0'),
      bankCommision: parseFloat(record.bank_commision || '0'),
      bankServiceTax: parseFloat(record.bank_service_tax || '0'),
      amountToBeDeductedInAdditionToBankCharges: parseFloat(
        record.amount_to_be_deducted_in_addition_to_bank_charges || '0',
      ),
      isNotOnSellRate: record.is_not_on_sell_rate === 'TRUE',
      convenienceFeesAmtInPaise: record.convenience_fees_amt_in_paise || '',
      convenienceFeesAdditionalAmtInPaise:
        record.convenience_fees_additional_amt_in_paise || '',
      settlementAmount: parseFloat(record.settlement_amount || '0'),
      sds: record.sds,
      sdscycle: record.sdscycle,
      programName: record.program_name,
      axisPayoutCreated: this.formatDate(record.axis_payout_created),
      payoutStatus: record.payout_status,
      payoutNodalAcc: record.payout_nodal_acc,
    };
  }

  private mapRefund(record: any): Partial<Refund> {
    return {
      transactionId: record.transaction_id,
      merchantDisplayName: record.merchant_display_name,
      transactionTypeId: record.transaction_type_id,
      transactionTypeName: record.transaction_type_name,
      txnStatusName: record.txn_status_name,
      txnStepName: record.txn_step_name,
      acquirerName: record.acquirer_name,
      paymentModeName: record.payment_mode_name,
      amount: parseFloat(record.amount),
      acquirerResponseCode: record.acquirer_response_code,
      acquirerResponseDescription: record.acquirer_response_description,
      transactionResponseCode: record.transaction_response_code,
      transactionStartDateTime: this.formatDate(
        record.transaction_start_date_time,
      ),
      txnCompletionDateTime: this.formatDate(record.txn_completion_date_time),
      timeToComplete: record.time_to_complete,
      transactionResponseMessage: record.transaction_response_message,
      isAggregator: record.is_aggregator === 'TRUE',
      isReversal: record.is_reversal === 'TRUE',
      pinePgIntegrationModeName: record.pine_pg_integration_mode_name,
      convenienceFeesAmtInPaise: record.convenience_fees_amt_in_paise,
      convenienceFeesGstAmtInPaise: record.convenience_fees_gst_amt_in_paise,
      convenienceFeesAdditionalAmtInPaise:
        record.convenience_fees_additional_amt_in_paise,
      category: record.category,
      businessTechnicalDecline: record.business_technical_decline,
      saleTxnDateTime:
        record.sale_txn_date_time !== '-'
          ? this.formatDate(record.sale_txn_date_time)
          : null,
    };
  }

  private mapSupport(record: any): Partial<Support> {
    return {
      caseNumber: record['Case Number'],
      date: this.formatDateForSupport(record['Date/Time']),
      createdTime: record['Created Time'],
      category: record['Category'],
      subject: record['Subject'],
      corporateName: record['Corporate Name'],
      modeOfPayment: record['Mode of Payment'],
      resolution: record['Resolution'],
    };
  }

  private formatDate(dateString: string): string {
    if (!dateString.includes('/')) {
      return null;
    }
    let [dd, mm, yyyy] = dateString.split('/');

    // Ensure 2-digit month/day
    const paddedMonth = mm.padStart(2, '0');
    const paddedDay = dd.padStart(2, '0');

    if (yyyy.length === 2) {
      yyyy = `20${yyyy}`;
    }

    // Return in ISO format YYYY-MM-DD
    return `${yyyy}-${paddedMonth}-${paddedDay}T00:00:00.000Z`;
  }

  private formatDateForSupport(dateString: string): string {
    if (!dateString.includes('/')) {
      return null;
    }
    let [mm, dd, yyyy] = dateString.split('/');

    // Ensure 2-digit month/day
    const paddedMonth = mm.padStart(2, '0');
    const paddedDay = dd.padStart(2, '0');

    if (yyyy.length === 2) {
      yyyy = `20${yyyy}`;
    }

    // Return in ISO format YYYY-MM-DD
    return `${yyyy}-${paddedMonth}-${paddedDay}T00:00:00.000Z`;
  }

  async importFromJson(type: 'settlement' | 'refund' | 'support') {
    const path = `${type}.json`;
    const fileContent = fs.readFileSync(path, 'utf8');

    let records: any[];
    try {
      records = JSON.parse(fileContent);
    } catch (err) {
      console.error('Invalid JSON format:', err);
      return;
    }

    const data = [];

    for (const record of records) {
      try {
        switch (type) {
          case 'settlement':
            data.push(this.mapTransaction(record));
            break;
          case 'refund':
            data.push(this.mapRefund(record));
            break;
          case 'support':
            data.push(this.mapSupport(record));
            break;
        }
      } catch (err) {
        console.log(
          `Failed to insert record: ${JSON.stringify(record)}\nError: ${err.message}`,
        );
      }
    }

    switch (type) {
      case 'settlement':
        await this.settlementRepo.bulkCreate(data);
        break;
      case 'refund':
        await this.refundRepo.bulkCreate(data);
        break;
      case 'support':
        await this.supportRepo.bulkCreate(data);
        break;
    }

    console.log(
      `✅ Successfully imported ${records.length} records into ${type} table`,
    );
  }

  async getData(data: GetQuery) {
    const { columns, table, filter } = data;
    const returnData = {};
    for (let i = 0; i < table.length; i++) {
      const t = table[i];
      let where = {};
      const filterData = filter[t] as Record<
        string,
        DateFilter | StringFilter | NumberFilter
      >;

      const keys = Object.keys(filterData);
      for (let j = 0; j < keys.length; j++) {
        const f = filterData[keys[j]];
        if (f.type === 'date' || f.type === 'number') {
          if (!where[keys[j]]) {
            where[keys[j]] = {};
          }
          if (f.gte) {
            where[keys[j]] = {
              ...where[keys[j]],
              [Op.gte]: f.gte,
            };
          }
          if (f.lte) {
            where[keys[j]] = {
              ...where[keys[j]],
              [Op.gte]: f.gte,
            };
          }
          if (f.eq) {
            where[keys[j]] = {
              ...where[keys[j]],
              [Op.eq]: f.eq,
            };
          }
          if (f.gt) {
            where[keys[j]] = {
              ...where[keys[j]],
              [Op.gt]: f.gt,
            };
          }
          if (f.lt) {
            where[keys[j]] = {
              ...where[keys[j]],
              [Op.lt]: f.lt,
            };
          }
        } else if (f.type === 'string') {
          if (!where[keys[j]]) {
            where[keys[j]] = {};
          }
          if (f.eq) {
            where[keys[j]] = {
              ...where[keys[j]],
              [Op.eq]: f.eq,
            };
          }
          if (f.leq) {
            where[keys[j]] = {
              ...where[keys[j]],
              [Op.iLike]: `%${f.leq}`,
            };
          }
          if (f.req) {
            where[keys[j]] = {
              ...where[keys[j]],
              [Op.iLike]: `${f.req}%`,
            };
          }
          if (f.leq) {
            where[keys[j]] = {
              ...where[keys[j]],
              [Op.iLike]: `%${f.beq}%`,
            };
          }
        }
      }

      let rows = [];
      switch (t) {
        case 'settlement':
          rows = await this.settlementRepo.findAll({
            where,
            attributes: columns[t],
            logging: console.log,
          });
          returnData[t] = rows;
          break;
        case 'refund':
          rows = await this.refundRepo.findAll({
            where,
            attributes: columns[t],
            logging: console.log,
          });
          returnData[t] = rows;
          break;
        case 'support':
          rows = await this.supportRepo.findAll({
            where,
            attributes: columns[t],
            logging: console.log,
          });
          returnData[t] = rows;
          break;
      }
    }

    return returnData;
  }

  async getDataByQuery(query: string) {
    const rowData = await this.settlementRepo.sequelize.query(query);
    const result = rowData[0];
    console.log(result);
    return result;
  }
}
