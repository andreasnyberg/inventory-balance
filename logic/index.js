const balanceHandler = {
  balance: {
    A: 0,
    B: 0,
    C: 0,
  },
  isAutoDoublerActive: false,
  getBalance: function() {
    return this.balance;
  },
  addToBalance: function(product, amount) {
    this.balance[product] = this.balance[product] + amount;
  },
  subtractFromBalance: function(product, amount) {
    this.balance[product] = this.balance[product] - amount;

    if (this.isAutoDoublerActive) {
      this.addToBalance(product, amount * 2);
    }
  },
  isBalanceBelowZero: function(product, amount) {
    return this.balance[product] - amount < 0;
  },
  toggleAutoDoubler: function() {
    this.isAutoDoublerActive = !this.isAutoDoublerActive;
  },
}

module.exports = {
  balanceHandler
};

