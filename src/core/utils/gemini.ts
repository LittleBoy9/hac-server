// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// // npm install -D @types/node

// import { GoogleGenAI } from '@google/genai';

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// export const getSqlQuery = async (query: string) => {
//   const config = {
//     responseMimeType: 'text/plain',
//   };
//   const model = 'gemini-2.0-flash';
//   const contents = [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: `You are a SQL query generator. Your task is to translate a given user request in natural language into a PostgreSQL query.

// Here are the table schemas you can use. Ensure that all table and column names are enclosed in double quotes to match the exact casing and avoid conflicts with reserved keywords.

// Table: "Refund"
// Columns:
// - "id" (UUID, Primary Key, NOT NULL)
// - "transactionId" (STRING, NOT NULL)
// - "merchantDisplayName" (STRING, NOT NULL)
// - "transactionTypeId" (STRING, NULL)
// - "transactionTypeName" (STRING, NULL)
// - "txnStatusName" (STRING, NULL)
// - "txnStepName" (STRING, NULL)
// - "acquirerName" (STRING, NULL)
// - "paymentModeName" (STRING, NULL)
// - "amount" (FLOAT, NULL)
// - "acquirerResponseCode" (STRING, NULL)
// - "acquirerResponseDescription" (STRING, NULL)
// - "transactionResponseCode" (STRING, NULL)
// - "transactionStartDateTime" (DATE, NULL)
// - "txnCompletionDateTime" (DATE, NULL)
// - "timeToComplete" (STRING, NULL)
// - "transactionResponseMessage" (STRING, NULL)
// - "isAggregator" (BOOLEAN, NULL)
// - "isReversal" (BOOLEAN, NULL)
// - "pinePgIntegrationModeName" (STRING, NULL)
// - "convenienceFeesAmtInPaise" (STRING, NULL)
// - "convenienceFeesGstAmtInPaise" (STRING, NULL)
// - "convenienceFeesAdditionalAmtInPaise" (STRING, NULL)
// - "category" (STRING, NULL)
// - "businessTechnicalDecline" (STRING, NULL)
// - "saleTxnDateTime" (DATE, NULL)
// - "deletedAt" (DATE, NULL) -- Added due to paranoid: true

// Table: "Settlement"
// Columns:
// - "id" (UUID, Primary Key, NOT NULL)
// - "transactionId" (STRING, NOT NULL)
// - "merchantDisplayName" (STRING, NOT NULL)
// - "txnStatusName" (STRING, NOT NULL)
// - "acquirerName" (STRING, NULL)
// - "issuerName" (STRING, NULL)
// - "paymentModeId" (STRING, NULL)
// - "paymentModeName" (STRING, NULL)
// - "cardTypeAssociationName" (STRING, NULL)
// - "amount" (FLOAT, NOT NULL)
// - "isAggregator" (BOOLEAN, NULL)
// - "isReversal" (BOOLEAN, NULL)
// - "transactionStartDateTime" (DATE, NULL)
// - "txnRefundAmt" (FLOAT, NOT NULL)
// - "batchId" (STRING, NOT NULL)
// - "nodalAccountBank" (STRING, NOT NULL)
// - "actualTxnAmount" (FLOAT, NOT NULL)
// - "refundAmount" (FLOAT, NOT NULL)
// - "bankChargeAmount" (FLOAT, NOT NULL)
// - "mdrCharge" (FLOAT, NOT NULL)
// - "mdrTax" (FLOAT, NOT NULL)
// - "platformFee" (FLOAT, NOT NULL)
// - "mardAmount" (FLOAT, NOT NULL)
// - "additonalTaxes" (FLOAT, NOT NULL)
// - "bankCommision" (FLOAT, NOT NULL)
// - "bankServiceTax" (FLOAT, NOT NULL)
// - "amountToBeDeductedInAdditionToBankCharges" (FLOAT, NOT NULL)
// - "isNotOnSellRate" (BOOLEAN, NOT NULL)
// - "convenienceFeesAmtInPaise" (STRING, NULL)
// - "convenienceFeesAdditionalAmtInPaise" (STRING, NULL)
// - "settlementAmount" (FLOAT, NOT NULL)
// - "sds" (STRING, NOT NULL)
// - "sdscycle" (STRING, NOT NULL)
// - "programName" (STRING, NOT NULL)
// - "axisPayoutCreated" (DATE, NULL)
// - "payoutStatus" (STRING, NOT NULL)
// - "payoutNodalAcc" (STRING, NOT NULL)
// - "deletedAt" (DATE, NULL) -- Added due to paranoid: true

// Table: "Support"
// Columns:
// - "id" (UUID, Primary Key, NOT NULL)
// - "caseNumber" (STRING, NOT NULL)
// - "date" (DATE, NULL)
// - "createdTime" (STRING, NOT NULL)
// - "category" (STRING, NOT NULL)
// - "subject" (STRING, NOT NULL)
// - "corporateName" (STRING, NOT NULL)
// - "modeOfPayment" (STRING, NULL)
// - "resolution" (TEXT, NULL)
// - "deletedAt" (DATE, NULL) -- Added due to paranoid: true

// Your output must be ONLY the PostgreSQL query, with no additional text or explanation.

// User query: ${query}

// `,
//         },
//       ],
//     },
//   ];

//   const response = await ai.models.generateContent({
//     model,
//     config,
//     contents,
//   });
//   return response.text;
// };
