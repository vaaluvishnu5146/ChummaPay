const router = require("express").Router();
const TransactionModel = require("../Model/Transaction.model");
/**
 * SUPORTED METHODS - GET, POST, PUT, DELETE, PATCH
 */

/**
 * INPUT - NULL
 * OUTPUT - GENERAL MESSAGE
 */
router.get("/test", (req, res, next) => {
  console.log(req.body);
  res.status(200).send({
    message: "End point working",
  });
});

/**
 * INPUT - NULL
 * OUTPUT - GENERAL MESSAGE
 */
router.post("/createTransaction", (req, res, next) => {
  const {
    payerUPIId = "",
    payeeUPIId = "",
    amountTransffered = 0,
    transactionStatus = "NA",
    transactionMessage = "",
  } = req.body;
  const Transaction = new TransactionModel({
    payerUPIId: payerUPIId,
    payeeUPIId: payeeUPIId,
    amountTransffered: amountTransffered,
    transactionStatus: transactionStatus,
    transactionMessage: transactionMessage,
  });
  Transaction.save()
    .then((response) => {
      if (response && response._id) {
        return res.status(200).send({
          message: "Transaction successfull!!!",
          response: response,
        });
      } else {
        return res.status(501).send({
          message: "Transaction Failed!!!",
          response: response,
        });
      }
    })
    .catch((error) => {
      return res.status(501).send({
        error: true,
        message: "Transaction Failed!!!",
        error: error,
      });
    });
});

module.exports = router;
