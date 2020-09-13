#!/usr/bin/env node
const prompts = require('prompts');

const { isNumbersOnly } = require('./helpers');
const { inventoryHandler: inv } = require('./logic');
const {
  printCurrentInventoryBalance,
  printError,
  printActionSell,
  printActionAdd,
  printActionPackageDeal,
  printActionAutoDoublerToggled,
} = require('./presentation');

const sellProduct = (product, amount) => {
  inv.subtractFromInventory(product, amount);
  printActionSell(product, amount);

  // 'Auto doubler'
  if (inv.isAutoDoublerActive) {
    const doubledAmount = amount * 2;
    printActionAdd(product, doubledAmount, true);
  }
}

const handleInput = input => {
  if (!input) return;
  const firstChar = input.charAt(0).toUpperCase();
  const secondChar = input.charAt(1).toUpperCase();
  const followingChars = input.substring(2, input.length);
  const productExists = Object.keys(inv.inventory).includes(secondChar);
  const packageDealExists = Object.keys(inv.packageDeals).includes(input.toUpperCase());

  switch (firstChar) {
    // Sell from inventory.
    case 'S':

      // Check if input command is a valid package deal.
      if (packageDealExists) {
        const packageDealName = input.toUpperCase();
        const packageDeal = inv.packageDeals[packageDealName];
      
        // Check if all package deals contents exists in inventory.
        const doesProductsExistsInInv = Object.keys(packageDeal).every(product => {
          const amount = packageDeal[product];

          return inv.inventory[product] >= amount;
        });

        if (!doesProductsExistsInInv) {
          printError(`Oh no, inventory is too low for this package deal ${packageDealName}. Aborting!`);
          break;
        }

        printActionPackageDeal(packageDealName);
        
        Object.keys(packageDeal).forEach(product => {
          const amount = packageDeal[product];
          sellProduct(product, amount);
        });

        printCurrentInventoryBalance(inv.getBalance());
        break;
      }

      // Check if command is valid.
      if (productExists && isNumbersOnly(followingChars)) {
        const product = secondChar;
        const amount = parseInt(followingChars, 10);
        
        if (inv.isProductAmountBelowZero(product, amount)) {
          printError(`Ooops, not enough amount of product ${product} in inventory. Aborting!`);
          break;
        }
        
        sellProduct(product, amount);
        printCurrentInventoryBalance(inv.getBalance());
        break;
      }

    // Add to inventory.
    case 'I':

      // Check if command is valid.
      if (productExists && isNumbersOnly(followingChars)) {
        const product = secondChar;
        const amount = parseInt(followingChars, 10);
        inv.addToInventory(product, amount);
        
        printActionAdd(product, amount);
        printCurrentInventoryBalance(inv.getBalance());
        break;
      }

    // Toggle the 'auto doubler'.
    case 'T':

      // Check if command is valid.
      if (input.length === 1) {
        inv.toggleAutoDoubler();
        printActionAutoDoublerToggled(inv.isAutoDoublerActive);
        break;
      }

    // Display current inventory balance.
    case 'L':

      // Check if command is valid.
      if (input.length === 1) {
        printCurrentInventoryBalance(inv.getBalance());
        break;
      }
    default:
      const message = `Sorry, "${input}" is not a valid command.`;
      printError(message);
  }

  initPrompt();
}

const initPrompt = async () => {
  const response = await prompts({
    type: 'text',
    name: 'input',
    message: 'Add command:'
  });

  handleInput(response.input);
};

initPrompt();