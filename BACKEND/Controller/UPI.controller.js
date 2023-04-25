const router = require("express").Router();
const BankingModel = require("../Model/Bank.model");
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
router.post("/createUpi", (req, res, next) => {
  const {
    bankName = "",
    bankAccountNumber = 0,
    upiIds = "",
    createdDate = "",
    updatedDate = "",
    isPrimary = false,
    upiPinNumber = 0000,
    nickName = "",
    userId = "",
  } = req.body;
  const NewAccount = new BankingModel({
    bankName: bankName,
    bankAccountNumber: bankAccountNumber,
    upiIds: upiIds,
    isPrimary: isPrimary,
    upiPinNumber: upiPinNumber,
    nickName: nickName,
    userId: userId,
  });
  NewAccount.save()
    .then((response) => {
      if (response && response._id) {
        return res.status(200).send({
          message: "Account created successfull!!!",
          response: response,
        });
      } else {
        return res.status(501).send({
          message: "Account Creation Failed!!!",
          response: response,
        });
      }
    })
    .catch((error) => {
      return res.status(501).send({
        error: true,
        message: "Account Creation Failed!!!",
        error: error,
      });
    });
});

module.exports = router;
