const express = require("express");
const bodyparser = require("body-parser");

/**
 * CREATE APP FROM EXPRESS INSTANCE
 */
const app = express();
/**
 * REGISTERING MIDDLEWARE
 */
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

/**
 * MIDDLE WARE REGISTERING
 * CONTROLLER REGISTERING
 */
app.use("/transactions", require("./Controller/Transaction.controller"));
app.use("/upi", require("./Controller/UPI.controller"));
app.use("/users", require("./Controller/Users.controller"));
app.use("/npci", require("./Controller/NPCI.controller"));

module.exports = app;
