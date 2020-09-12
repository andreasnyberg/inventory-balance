#!/usr/bin/env node
const prompts = require('prompts');

const { isNumbersOnly } = require('./helpers');
const { inventoryHandler: inv } = require('./logic');
const {
  printCurrentInventoryBalance,
  printError,
  printActionSell,
  printActionAdd,
  printActionAutoDoublerToggled,
} = require('./presentation');

const handleInput = input => {
  if (!input) return;
  const firstChar = input.charAt(0).toUpperCase();
  const secondChar = input.charAt(1).toUpperCase();
  const followingChars = input.substring(2, input.length);
  const productExistsInInventory = Object.keys(inv.inventory).includes(secondChar);

  switch (firstChar) {
    // Sell from inventory.
    case 'S':

      // Check if command is valid.
      if (productExistsInInventory && isNumbersOnly(followingChars)) {
        const product = secondChar;
        const amount = parseInt(followingChars, 10);
        
        if (inv.isProductAmountBelowZero(product, amount)) {
          printError(`Ooops, not enough amount of product ${product} in inventory. Aborting!`);
          break;
        }
        
        inv.subtractFromInventory(product, amount);
        printActionSell(product, amount);

        // 'Auto doubler'
        if (inv.isAutoDoublerActive) {
          const doubledAmount = amount * 2;
          printActionAdd(product, doubledAmount, true);
        }

        printCurrentInventoryBalance(inv.getBalance());
        break;
      }

    // Add to inventory.
    case 'I':

      // Check if command is valid.
      if (productExistsInInventory && isNumbersOnly(followingChars)) {
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