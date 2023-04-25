/**
 * MONGOOSE IS AN NPM PACKAGE
 * IT HELPS US TO CREATE BLUE-PRINT OF SINGLE `TRANSACTION` DATA
 * WE CAN DO VALIDATION FOR DATA
 * WE CAN CREATE REFERENCES BETWEEN COLLECTION
 * USING MONGOOSE WE CAN CREATE SCHEMA AND FROM SCHEMA WE CAN EXPORT MODEL
 */
const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  payerUPIId: {
    type: String,
    required: true,
  },
  payeeUPIId: {
    type: String,
    required: true,
  },
  amountTransffered: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  transactionStatus: {
    type: String,
    required: true,
  },
  transactionMessage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("transaction", TransactionSchema);
