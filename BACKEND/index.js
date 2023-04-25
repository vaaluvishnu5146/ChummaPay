const express = require("express");
const ChummaPayAppServer = require("./app");
/**
 * CREATE APP SERVER WITH HELP OF EXPRESS
 */

const NODE_SERVER = express();
const PORT = 5000;

/**
 * CONFIGURING AND CONNECT TO MONGO DB ATLAS INSTANCE
 */
require("./dbconfig");

/**
 * REGISTER CHUMMA PAY APP
 * WITH MY APP SERVER
 */
NODE_SERVER.use("/", ChummaPayAppServer);

/**
 * START THE EXPRESS SERVER
 */
NODE_SERVER.listen(PORT, "localhost", function () {
  console.log(`SERVER STARTED ${PORT}`);
});

console.log("CHUMMA PAY MAADI BOSS");
