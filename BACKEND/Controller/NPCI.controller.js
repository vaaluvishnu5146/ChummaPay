const router = require("express").Router();
const NpciModel = require("../Model/NPCI.model");
const { response } = require("../app");
const { getNewBalance } = require("../utils/money");

/**
 * METHOD = GET
 * GET OUTSTANDING BALANCE OF A BALANCE OF USER BANK ACCOUNT
 * INPUT: bankId and userId
 * OUTPUT: NPCI user bank balance data
 */
router.post("/userBalance", (req, res, next) => {
  const { bankId = "", userId = "" } = req.body;
  if (!userId || !bankId) {
    return res.status(400).json({
      success: false,
      error: "Either Bank Id or User Id is not valid",
    });
  }
  NpciModel.findOne({ bankId: bankId, userId: userId })
    .then((response) => {
      console.log(response);
      if (response && response._id) {
        return res.status(200).json({
          success: true,
          message: "Balance fetched successfully!!!",
          balance: response.outstandingBalance,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "No Data Found!!!",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        error: err,
      });
    });
});

/**
 * METHOD = POST
 * ROUTE = /createWallet
 * INPUT = bankId, userId, outstandingBalance, updatedDate*
 */
router.post("/createWallet", async (req, res, next) => {
  const { bankId, userId, outstandingBalance } = req.body;

  const Wallet = new NpciModel({
    bankId: bankId,
    userId: userId,
    outstandingBalance: outstandingBalance,
  });
  const duplicateWallet = await NpciModel.findOne({
    bankId: bankId,
    userId: userId,
  });
  if (duplicateWallet && duplicateWallet._id) {
    return res.status(409).json({
      success: false,
      message: "Bad Request!!!",
      error: "Wallet for BankId or User Id already exists!!",
    });
  } else {
    Wallet.save()
      .then((response) => {
        if (response && response._id) {
          return res.status(200).json({
            success: true,
            message: "Wallet Created Successfullty!!!",
            data: response,
          });
        } else {
          return res.status(500).json({
            success: false,
            message: "Internal Server Error!!!",
            data: response,
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: "Bad Request!!!",
          error: err,
        });
      });
  }
});

/**
 * METHOD = PATCH
 * ROUTE = /updateWallet
 * INPUT = bankId, userId, amount = 50, transactionType = credit | debit
 */
router.patch("/updateWallet", async (req, res, next) => {
  const { payerBankId, payerUserId, payeeBankId, payeeUserId, amount } =
    req.body;

  // UN HAPPY CASE
  if (!payerBankId || !payerUserId || !payeeBankId || !payeeUserId || !amount) {
    return res.status(400).json({
      success: false,
      message: "Bad Request!!!",
      error:
        "Payer Bank Id or Payer User Id or Payee bank Id or Payee User Id or Amount is missing",
    });
  } else {
    // HAPPY CASE
    // GET WALLET
    // CHECK FOR BALANCE
    // DEBIT OR CREDIT MONEY
    // UPDATE WALLET
    // RETURN APPROPRIATE RESPONSE
    let payerWallet = await NpciModel.findOne({
      bankId: payerBankId,
      userId: payerUserId,
    });
    if (payerWallet && payerWallet._id) {
      // DEBIT MONEY FROM PAYER
      NpciModel.updateOne(
        { _id: payerWallet._id },
        {
          outstandingBalance: getNewBalance(
            amount,
            payerWallet.outstandingBalance,
            "debit"
          ),
        }
      ).then(async (response) => {
        if (response) {
          let payeeWallet = await NpciModel.findOne({
            bankId: payeeBankId,
            userId: payeeUserId,
          });
          const result = await NpciModel.updateOne(
            { _id: payeeWallet._id },
            {
              outstandingBalance: getNewBalance(
                amount,
                payeeWallet.outstandingBalance,
                "credit"
              ),
            }
          );
          console.log(result);
          res.status(200).json({
            success: true,
            message: "Wallet Update Successfully!!!",
          });
        }
      });
    } else {
      // UN HAPPY CASE FOR NO WALLET DATA
      res.status(400).json({
        success: false,
        message: "Bad Request!!!",
        error: "Bank Id or UserId is missing",
      });
    }
  }
});

module.exports = router;
