/* eslint-disable no-console */
import chalk from 'chalk';

const printErrors = (summary, errors) => {
  console.log(chalk.red(summary), '\n');
  errors.forEach(err => console.log(err.message || err, '\n'));
};

export default printErrors;
