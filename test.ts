export const DATA_QUERY_RESPONSE_SCHEMA = {
  name: "generate_data_query",
  description: "Generate a structured GetQuery object for database operations",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "object",
        description: "The GetQuery object for database operations",
        properties: {
          table: {
            type: "array",
            description: "Array of table names to query from",
            items: {
              type: "string",
              enum: ["settlement", "refund", "support"]
            },
            minItems: 1
          },
          columns: {
            type: "object",
            description: "Columns to select from each table",
            properties: {
              settlement: {
                type: "array",
                items: {
                  type: "string",
                  enum: [
                    "id", "transactionId", "merchantDisplayName", "txnStatusName",
                    "acquirerName", "issuerName", "paymentModeId", "paymentModeName",
                    "cardTypeAssociationName", "amount", "isAggregator", "isReversal",
                    "transactionStartDateTime", "txnRefundAmt", "batchId", "nodalAccountBank",
                    "actualTxnAmount", "refundAmount", "bankChargeAmount", "mdrCharge",
                    "mdrTax", "platformFee", "mardAmount", "additonalTaxes", "bankCommision",
                    "bankServiceTax", "amountToBeDeductedInAdditionToBankCharges",
                    "isNotOnSellRate", "convenienceFeesAmtInPaise", "convenienceFeesAdditionalAmtInPaise",
                    "settlementAmount", "sds", "sdscycle", "programName", "axisPayoutCreated",
                    "payoutStatus", "payoutNodalAcc"
                  ]
                }
              },
              refund: {
                type: "array",
                items: {
                  type: "string",
                  enum: [
                    "id", "transactionId", "merchantDisplayName", "transactionTypeId",
                    "transactionTypeName", "txnStatusName", "txnStepName", "acquirerName",
                    "paymentModeName", "amount", "acquirerResponseCode", "acquirerResponseDescription",
                    "transactionResponseCode", "transactionStartDateTime", "txnCompletionDateTime",
                    "timeToComplete", "transactionResponseMessage", "isAggregator", "isReversal",
                    "pinePgIntegrationModeName", "convenienceFeesAmtInPaise", "convenienceFeesGstAmtInPaise",
                    "convenienceFeesAdditionalAmtInPaise", "category", "businessTechnicalDecline",
                    "saleTxnDateTime"
                  ]
                }
              },
              support: {
                type: "array",
                items: {
                  type: "string",
                  enum: [
                    "id", "caseNumber", "date", "createdTime", "category", "subject",
                    "corporateName", "modeOfPayment", "resolution"
                  ]
                }
              }
            },
            additionalProperties: false
          },
          filter: {
            type: "object",
            description: "Filters to apply to each table",
            properties: {
              settlement: {
                type: "object",
                additionalProperties: {
                  oneOf: [
                    {
                      type: "object",
                      properties: {
                        type: { type: "string", const: "date" },
                        gte: { type: "string", format: "date" },
                        lte: { type: "string", format: "date" },
                        eq: { type: "string", format: "date" },
                        gt: { type: "string", format: "date" },
                        lt: { type: "string", format: "date" }
                      },
                      required: ["type"],
                      additionalProperties: false
                    },
                    {
                      type: "object",
                      properties: {
                        type: { type: "string", const: "string" },
                        eq: { type: "string" },
                        leq: { type: "string" },
                        req: { type: "string" },
                        beq: { type: "string" }
                      },
                      required: ["type"],
                      additionalProperties: false
                    },
                    {
                      type: "object",
                      properties: {
                        type: { type: "string", const: "number" },
                        gte: { type: "number" },
                        lte: { type: "number" },
                        eq: { type: "number" },
                        gt: { type: "number" },
                        lt: { type: "number" }
                      },
                      required: ["type"],
                      additionalProperties: false
                    }
                  ]
                }
              },
              refund: {
                type: "object",
                additionalProperties: {
                  oneOf: [
                    {
                      type: "object",
                      properties: {
                        type: { type: "string", const: "date" },
                        gte: { type: "string", format: "date" },
                        lte: { type: "string", format: "date" },
                        eq: { type: "string", format: "date" },
                        gt: { type: "string", format: "date" },
                        lt: { type: "string", format: "date" }
                      },
                      required: ["type"],
                      additionalProperties: false
                    },
                    {
                      type: "object",
                      properties: {
                        type: { type: "string", const: "string" },
                        eq: { type: "string" },
                        leq: { type: "string" },
                        req: { type: "string" },
                        beq: { type: "string" }
                      },
                      required: ["type"],
                      additionalProperties: false
                    },
                    {
                      type: "object",
                      properties: {
                        type: { type: "string", const: "number" },
                        gte: { type: "number" },
                        lte: { type: "number" },
                        eq: { type: "number" },
                        gt: { type: "number" },
                        lt: { type: "number" }
                      },
                      required: ["type"],
                      additionalProperties: false
                    }
                  ]
                }
              },
              support: {
                type: "object",
                additionalProperties: {
                  oneOf: [
                    {
                      type: "object",
                      properties: {
                        type: { type: "string", const: "date" },
                        gte: { type: "string", format: "date" },
                        lte: { type: "string", format: "date" },
                        eq: { type: "string", format: "date" },
                        gt: { type: "string", format: "date" },
                        lt: { type: "string", format: "date" }
                      },
                      required: ["type"],
                      additionalProperties: false
                    },
                    {
                      type: "object",
                      properties: {
                        type: { type: "string", const: "string" },
                        eq: { type: "string" },
                        leq: { type: "string" },
                        req: { type: "string" },
                        beq: { type: "string" }
                      },
                      required: ["type"],
                      additionalProperties: false
                    },
                    {
                      type: "object",
                      properties: {
                        type: { type: "string", const: "number" },
                        gte: { type: "number" },
                        lte: { type: "number" },
                        eq: { type: "number" },
                        gt: { type: "number" },
                        lt: { type: "number" }
                      },
                      required: ["type"],
                      additionalProperties: false
                    }
                  ]
                }
              }
            },
            additionalProperties: false
          }
        },
        required: ["table", "columns"],
        additionalProperties: false
      },
      explanation: {
        type: "string",
        description: "Brief explanation of the generated query"
      }
    },
    required: ["query", "explanation"],
    additionalProperties: false
  }
};