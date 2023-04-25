function getNewBalance(amount = 0, balance = 0, type = "") {
  let newBalance = 0;
  if (type === "credit") {
    newBalance = balance + amount;
  } else {
    newBalance = balance - amount;
  }
  return newBalance;
}

module.exports = {
  getNewBalance,
};
