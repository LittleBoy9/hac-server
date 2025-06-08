import { Injectable } from '@nestjs/common';
import client from 'src/core/openai/openai.provider';
import * as fs from 'fs';
import { refund, support, settlement } from '@constants/index';
// import { getSqlQuery } from '@utils/gemini';
import { GoogleGenAI } from '@google/genai';
import { PaymentService } from '@modules/payment/v1/payment.service';
import { AiService } from '@modules/ai/ai.service';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

@Injectable()
export class AskService {
  private tableColumns: Record<string, string[]>;

  constructor(
    private paymentService: PaymentService,
    private aiService: AiService,
  ) {
    this.tableColumns = {
      refund,
      support,
      settlement,
    };
  }
  async getSqlQuery(query: string) {
    const config = {
      responseMimeType: 'text/plain',
    };
    // const model = 'gemini-2.5-flash-preview-05-20';
    const model = 'gemini-2.0-flash';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `You are a SQL query generator. Your task is to translate a given user request in natural language into a PostgreSQL query.
  
  Here are the table schemas you can use. Ensure that all table and column names are enclosed in double quotes to match the exact casing and avoid conflicts with reserved keywords.
  
  Table: "Refunds"
  Columns:
  - "id" (UUID, Primary Key, NOT NULL)
  - "transactionId" (STRING, NOT NULL)
  - "merchantDisplayName" (STRING, NOT NULL)
  - "transactionTypeId" (STRING, NULL)
  - "transactionTypeName" (STRING, NULL)
  - "txnStatusName" (STRING, NULL)
  - "txnStepName" (STRING, NULL)
  - "acquirerName" (STRING, NULL)
  - "paymentModeName" (STRING, NULL)
  - "amount" (FLOAT, NULL)
  - "acquirerResponseCode" (STRING, NULL)
  - "acquirerResponseDescription" (STRING, NULL)
  - "transactionResponseCode" (STRING, NULL)
  - "transactionStartDateTime" (DATE, NULL)
  - "txnCompletionDateTime" (DATE, NULL)
  - "timeToComplete" (STRING, NULL)
  - "transactionResponseMessage" (STRING, NULL)
  - "isAggregator" (BOOLEAN, NULL)
  - "isReversal" (BOOLEAN, NULL)
  - "pinePgIntegrationModeName" (STRING, NULL)
  - "convenienceFeesAmtInPaise" (STRING, NULL)
  - "convenienceFeesGstAmtInPaise" (STRING, NULL)
  - "convenienceFeesAdditionalAmtInPaise" (STRING, NULL)
  - "category" (STRING, NULL)
  - "businessTechnicalDecline" (STRING, NULL)
  - "saleTxnDateTime" (DATE, NULL)
  - "deletedAt" (DATE, NULL) -- Added due to paranoid: true
  
  Table: "Settlements"
  Columns:
  - "id" (UUID, Primary Key, NOT NULL)
  - "transactionId" (STRING, NOT NULL)
  - "merchantDisplayName" (STRING, NOT NULL)
  - "txnStatusName" (STRING, NOT NULL)
  - "acquirerName" (STRING, NULL)
  - "issuerName" (STRING, NULL)
  - "paymentModeId" (STRING, NULL)
  - "paymentModeName" (STRING, NULL)
  - "cardTypeAssociationName" (STRING, NULL)
  - "amount" (FLOAT, NOT NULL)
  - "isAggregator" (BOOLEAN, NULL)
  - "isReversal" (BOOLEAN, NULL)
  - "transactionStartDateTime" (DATE, NULL)
  - "txnRefundAmt" (FLOAT, NOT NULL)
  - "batchId" (STRING, NOT NULL)
  - "nodalAccountBank" (STRING, NOT NULL)
  - "actualTxnAmount" (FLOAT, NOT NULL)
  - "refundAmount" (FLOAT, NOT NULL)
  - "bankChargeAmount" (FLOAT, NOT NULL)
  - "mdrCharge" (FLOAT, NOT NULL)
  - "mdrTax" (FLOAT, NOT NULL)
  - "platformFee" (FLOAT, NOT NULL)
  - "mardAmount" (FLOAT, NOT NULL)
  - "additonalTaxes" (FLOAT, NOT NULL)
  - "bankCommision" (FLOAT, NOT NULL)
  - "bankServiceTax" (FLOAT, NOT NULL)
  - "amountToBeDeductedInAdditionToBankCharges" (FLOAT, NOT NULL)
  - "isNotOnSellRate" (BOOLEAN, NOT NULL)
  - "convenienceFeesAmtInPaise" (STRING, NULL)
  - "convenienceFeesAdditionalAmtInPaise" (STRING, NULL)
  - "settlementAmount" (FLOAT, NOT NULL)
  - "sds" (STRING, NOT NULL)
  - "sdscycle" (STRING, NOT NULL)
  - "programName" (STRING, NOT NULL)
  - "axisPayoutCreated" (DATE, NULL)
  - "payoutStatus" (STRING, NOT NULL)
  - "payoutNodalAcc" (STRING, NOT NULL)
  - "deletedAt" (DATE, NULL) -- Added due to paranoid: true
  
  Table: "Supports"
  Columns:
  - "id" (UUID, Primary Key, NOT NULL)
  - "caseNumber" (STRING, NOT NULL)
  - "date" (DATE, NULL)
  - "createdTime" (STRING, NOT NULL)
  - "category" (STRING, NOT NULL)
  - "subject" (STRING, NOT NULL)
  - "corporateName" (STRING, NOT NULL)
  - "modeOfPayment" (STRING, NULL)
  - "resolution" (TEXT, NULL)
  - "deletedAt" (DATE, NULL) -- Added due to paranoid: true
  
  Query must be read only. No UPDATE, DELETE OR DROP query.

  IMPORTANT: Your output must be ONLY the PostgreSQL query, with no additional text or explanation.
  
  User query: ${query}
  
  `,
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });
    return response.text.replace('```sql', '').replace('```', '');
  }

  // private async detectStructuredQuery(query: string): Promise<any> {
  //   const detectionPrompt = `${fs.readFileSync('ins.txt', 'utf8')}. User Query- ${query}`;

  //   console.log(' detectionPrompt \n', detectionPrompt);
  //   const response = await client.chat.completions.create({
  //     model: 'gpt-3.5-turbo',
  //     messages: [{ role: 'system', content: detectionPrompt }],
  //     temperature: 0,
  //   });

  //   const content = response.choices[0].message.content?.trim();
  //   console.log('Structured detection response:', content);

  //   try {
  //     return content;
  //     const parsed = JSON.parse(content || '');
  //     return parsed;
  //   } catch (e) {
  //     console.error('Error parsing structured detection response:', e);
  //     return null;
  //   }
  // }

  async getResponse(query: string): Promise<any> {
    try {
      console.log(query);
      const result = await this.getSqlQuery(query);
      const rawQuery = result.toLocaleLowerCase();
      console.log(rawQuery);
      if (rawQuery.includes('drop') || rawQuery.trim().length === 0) {
        return 'This action is not permitted';
      }
      console.log(result);
      const data = await this.paymentService.getDataByQuery(result);
      const prompt = this.aiService.buildPrompt(
        `SQL-${result}\nQuery-${query}`,
        data,
      );
      const response = await this.aiService.getGPTResponse('gpt-4', prompt);
      // return { data, response };
      console.log(response);
      return response;
    } catch (e) {
      console.error(e);
      // return null;
      return 'This action is not permitted';
    }
  }
}
