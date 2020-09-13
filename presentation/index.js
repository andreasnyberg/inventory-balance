const boxen = require('boxen');
const chalk = require('chalk');

module.exports = {
  printCurrentInventoryBalance: (inventoryList) => {
    const boxenOptions = {
      margin: {
        bottom: 1
      },
      padding: 1,
      borderStyle: "round",
      borderColor: "grey",
    };
        
    let inventoryStr = 'Inventory balance: \n \n'; 
    const productsArr = Object.keys(inventoryList);

    productsArr.forEach((item, i) => {
      const product = chalk.yellow.bold(`${item}`);
      const amount = chalk.magenta(`${inventoryList[item]}`);
      const isLast = (i + 1) === productsArr.length;
      const lineBreak = isLast ? '' : '\n';

      inventoryStr += `${product}: ${amount} ${lineBreak}`;
    });

    const inventoryStrWhite = chalk.white(inventoryStr);
    
    console.log(boxen(inventoryStrWhite, boxenOptions));
  },
  printError: (message) => {
    console.log(chalk.red('\n' + message));
  },
  printActionSell: (p, a) => {
    const product = chalk.yellow.bold(p);
    const amount = chalk.magenta(a.toString());
    const message = `Selling ${amount} of product ${product} from inventory.`;

    console.log(chalk.white(message));
  },
  printActionAdd: (p, a, autoDoubled = false) => {
    const product = chalk.yellow.bold(p);
    const amount = chalk.magenta(a.toString());
    const autoStr = autoDoubled ? ' (automatically)' : '';
    const message = `Adding ${amount} of product ${product} to inventory${autoStr}.`;

    console.log(chalk.white(message));
  },
  printActionPackageDeal: (n) => {
    const name = chalk.yellow(n);
    const message = `Selling package deal ${name}:`;

    console.log(chalk.white.bold(message));
  },
  printActionAutoDoublerToggled: (isActive) => {
    const activeStr = isActive ? 'ON' : 'OFF';
    const message = `Toggle 'auto doubler', now its ${chalk.cyan(activeStr)}.`;

    console.log(chalk.white(message));
  },
};

