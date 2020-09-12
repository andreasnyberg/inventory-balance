#!/usr/bin/env node
const prompts = require('prompts');

const { isNumbersOnly } = require('./helpers');
const { balanceHandler: b } = require('./logic');
const {
  printCurrentBalance,
  printError,
  printActionSell,
  printActionAdd,
  printActionAutoDoublerToggled,
} = require('./presentation');

const handleInput = input => {
  const firstChar = input.charAt(0).toUpperCase();
  const secondChar = input.charAt(1).toUpperCase();
  const followingChars = input.substring(2, input.length);
  const productExistsInInventory = Object.keys(b.balance).includes(secondChar);

  switch (firstChar) {
    // Sell from inventory.
    case 'S':
      
      // Check if command is valid.
      if (productExistsInInventory && isNumbersOnly(followingChars)) {
        const product = secondChar;
        const inputAmount = parseInt(followingChars, 10);
        
        if (b.isBalanceBelowZero(product, inputAmount)) {
          printError(`Ooops, not enough amount of product ${product} in inventory. Aborting!`);
          break;
        }
        
        b.subtractFromBalance(product, inputAmount);
        printActionSell(product, inputAmount);

        // 'Auto doubler'
        if (b.isAutoDoublerActive) {
          const doubledAmount = inputAmount * 2;
          printActionAdd(product, doubledAmount, true);
        }

        printCurrentBalance(b.getBalance());
        break;
      }

    // Add to inventory.
    case 'I':
      
      // Check if command is valid.
      if (productExistsInInventory && isNumbersOnly(followingChars)) {
        const product = secondChar;
        const inputAmount = parseInt(followingChars, 10);
        b.addToBalance(product, inputAmount);
        
        printActionAdd(product, inputAmount);
        printCurrentBalance(b.getBalance());
        break;
      }

    // Toggle the 'auto doubler'.
    case 'T':

      // Check if command is valid.
      if (input.length === 1) {
        b.toggleAutoDoubler();
        printActionAutoDoublerToggled(b.isAutoDoublerActive);
        break;
      }

    // Display current inventory balance.
    case 'L':

      // Check if command is valid.
      if (input.length === 1) {
        printCurrentBalance(b.getBalance());
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