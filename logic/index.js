const balanceHandler = {
  balance: 0,
  getBalance: function() {
    return this.balance;
  },
  addToBalance: function(amount) {
    this.balance = this.balance + amount;
  },
  subtractFromBalance: function(amount) {
    this.balance = this.balance - amount;
  },
  isBalanceBelowZero: function(amount) {
    return this.balance - amount < 0;
  },
}

module.exports = {
  balanceHandler
};

