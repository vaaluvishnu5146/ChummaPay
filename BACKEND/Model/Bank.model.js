/**
 * MONGOOSE IS AN NPM PACKAGE
 * IT HELPS US TO CREATE BLUE-PRINT OF SINGLE `TRANSACTION` DATA
 * WE CAN DO VALIDATION FOR DATA
 * WE CAN CREATE REFERENCES BETWEEN COLLECTION
 * USING MONGOOSE WE CAN CREATE SCHEMA AND FROM SCHEMA WE CAN EXPORT MODEL
 */
const mongoose = require("mongoose");

const BankAccountSchema = mongoose.Schema({
  bankName: {
    type: String,
    required: true,
  },
  bankAccountNumber: {
    type: Number,
    required: true,
  },
  upiIds: {
    type: Array,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  updatedDate: {
    type: Date,
    default: Date.now(),
  },
  isPrimary: {
    type: Boolean,
    required: true,
  },
  upiPinNumber: {
    type: Number,
    required: true,
  },
  nickName: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("bankaccount", BankAccountSchema);
