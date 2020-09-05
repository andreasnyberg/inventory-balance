#!/usr/bin/env node

const prompts = require('prompts');
const boxen = require('boxen');
const chalk = require('chalk');

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
  backgroundColor: "#555555"
};

const isNumbersOnly = chars => chars.match(/^[0-9]+$/);

const handleInput = input => {
  //const inputBox = boxen(input, boxenOptions);
  const firstChar = input.charAt(0).toUpperCase();
  const followingChars = input.substring(1, input.length);

  switch (firstChar) {
    case 'S':
      // Sälja X antal.

      if (isNumbersOnly(followingChars)) {
        // Do stuff

        break;
      }

    case 'I':
      // Inleverera X antal.

      if (isNumbersOnly(followingChars)) {
        // Do stuff

        break;
      }

    case 'L':
      // Visa aktuellt lager.

      if (input.length === 1) {
        console.log('Current inventory balance:');
        console.log(boxen('22', boxenOptions));
        break;
      }
    default:
      const errorMessage = chalk.red.bold(`Sorry, "${input}" is not a valid command.`);
      console.log(errorMessage);
  }

  initPrompt();
}

const initPrompt = async () => {
  const response = await prompts({
    type: 'text',
    name: 'input',
    message: 'Please add inventory command:'
  });

  handleInput(response.input);
};

initPrompt();