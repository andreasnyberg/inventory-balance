#!/usr/bin/env node
const prompts = require('prompts');

const { isNumbersOnly } = require('./helpers');
const { balanceHandler: b } = require('./logic');
const {
  printCurrentBalance,
  printError,
  printActionSell,
  printActionAdd 
} = require('./presentation');

const handleInput = input => {
  const firstChar = input.charAt(0).toUpperCase();
  const followingChars = input.substring(1, input.length);

  switch (firstChar) {
    // Sell from inventory.
    case 'S':

      // Check if command is valid.
      if (isNumbersOnly(followingChars)) {
        const inputAmount = parseInt(followingChars, 10);
        
        if (b.isBalanceBelowZero(inputAmount)) {
          printError('Ooops, not enough amount of products in inventory. Aborting!');
        } else {
          b.subtractFromBalance(inputAmount);
          printActionSell(inputAmount);
        }

        printCurrentBalance(b.getBalance());

        break;
      }

    // Add to inventory.
    case 'I':

      // Check if command is valid.
      if (isNumbersOnly(followingChars)) {
        const inputAmount = parseInt(followingChars, 10);
        b.addToBalance(inputAmount);
        
        printActionAdd(inputAmount);
        printCurrentBalance(b.getBalance());
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