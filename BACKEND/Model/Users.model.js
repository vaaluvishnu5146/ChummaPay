/**
 * MONGOOSE IS AN NPM PACKAGE
 * IT HELPS US TO CREATE BLUE-PRINT OF SINGLE `TRANSACTION` DATA
 * WE CAN DO VALIDATION FOR DATA
 * WE CAN CREATE REFERENCES BETWEEN COLLECTION
 * USING MONGOOSE WE CAN CREATE SCHEMA AND FROM SCHEMA WE CAN EXPORT MODEL
 */
const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userNickName: {
    type: String,
    required: false,
  },
  primaryEmail: {
    type: String,
    required: true,
  },
  secondaryEmail: {
    type: String,
    required: false,
    default: null,
  },
  primaryPhoneNumber: {
    type: Number,
    required: true,
  },
  secondaryPhoneNumber: {
    type: Number,
    required: false,
  },
  birthDay: {
    type: Date,
    required: false,
  },
  primaryAddress: {
    type: String,
    required: false,
    default: null,
  },
});

module.exports = mongoose.model("user", UsersSchema);
