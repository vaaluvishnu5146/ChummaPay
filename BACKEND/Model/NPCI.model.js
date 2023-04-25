/**
 * MONGOOSE IS AN NPM PACKAGE
 * IT HELPS US TO CREATE BLUE-PRINT OF SINGLE `TRANSACTION` DATA
 * WE CAN DO VALIDATION FOR DATA
 * WE CAN CREATE REFERENCES BETWEEN COLLECTION
 * USING MONGOOSE WE CAN CREATE SCHEMA AND FROM SCHEMA WE CAN EXPORT MODEL
 */
const mongoose = require("mongoose");

const NPCISchema = mongoose.Schema({
  bankId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  outstandingBalance: {
    type: Number,
    default: 1000,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  updatedDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("npci", NPCISchema);
