const boxen = require('boxen');
const chalk = require('chalk');

module.exports = {
  printCurrentBalance: (amount) => {
    const boxenOptions = {
      margin: {
        bottom: 1
      },
      padding: 1,
      borderStyle: "round",
      borderColor: "green",
    };
  
    const text = chalk.white('Inventory balance: \n'); 
    const amountStr = chalk.green.bold(amount.toString());
  
    console.log(boxen(text + amountStr, boxenOptions));
  },
  printError: (message) => {
    console.log(chalk.red(message));
  },
  printActionSell: (amount) => {
    const amountStr = chalk.magenta(amount.toString());
    console.log(chalk.white(`\n Selling ${amountStr} from inventory.`));
  },
  printActionAdd: (amount) => {
    const amountStr = chalk.magenta(amount.toString());
    console.log(chalk.white(`\n Adding ${amountStr} to inventory.`));
  },
};

