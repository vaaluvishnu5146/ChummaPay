const router = require("express").Router();
const UsersModel = require("../Model/Users.model");

/**
 * CREATING A USER
 * METHOD = POST
 * INPUT = USERDETAILS
 * OUTPUT = CREATED USER DETAILS
 */
router.post("/createUser", (req, res, next) => {
  const {
    userName = "",
    userNickName = "",
    primaryEmail = "",
    secondaryEmail,
    primaryPhoneNumber = "",
    secondaryPhoneNumber = "",
    birthDay = "",
    primaryAddress,
  } = req.body;

  const userDetails = new UsersModel({
    userName,
    userNickName,
    primaryEmail,
    secondaryEmail,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    birthDay,
    primaryAddress,
  });

  userDetails
    .save()
    .then((response) => {
      if (response && response._id) {
        return res.status(200).json({
          success: true,
          message: "User Created Successfully!!!",
          data: response,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: "User creation failed!!!",
          data: response,
        });
      }
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error: error,
      });
    });
});

module.exports = router;
