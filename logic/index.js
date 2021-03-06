const inventoryHandler = {
  inventory: {
    A: 0,
    B: 0,
    C: 0,
  },
  packageDeals: {
    SP1: {
      A: 5,
      B: 5,
      C: 5,
    },
    SP2: {
      A: 1,
      B: 2,
      C: 3,
    },
  },
  isAutoDoublerActive: false,
  getBalance: function() {
    return this.inventory;
  },
  addToInventory: function(product, amount) {
    this.inventory[product] = this.inventory[product] + amount;
  },
  subtractFromInventory: function(product, amount) {
    this.inventory[product] = this.inventory[product] - amount;

    if (this.isAutoDoublerActive) {
      this.addToInventory(product, amount * 2);
    }
  },
  isProductAmountBelowZero: function(product, amount) {
    return this.inventory[product] - amount < 0;
  },
  toggleAutoDoubler: function() {
    this.isAutoDoublerActive = !this.isAutoDoublerActive;
  },
}

module.exports = {
  inventoryHandler
};

