const balanceHandler = {
  balance: 0,
  isAutoDoublerActive: false,
  getBalance: function() {
    return this.balance;
  },
  addToBalance: function(amount) {
    this.balance = this.balance + amount;
  },
  subtractFromBalance: function(amount) {
    this.balance = this.balance - amount;

    if (this.isAutoDoublerActive) {
      this.addToBalance(amount * 2);
    }
  },
  isBalanceBelowZero: function(amount) {
    return this.balance - amount < 0;
  },
  toggleAutoDoubler: function() {
    this.isAutoDoublerActive = !this.isAutoDoublerActive;
  },
}

module.exports = {
  balanceHandler
};

