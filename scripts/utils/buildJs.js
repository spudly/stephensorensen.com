/* eslint-disable no-console */

import chalk from 'chalk';
import webpack from 'webpack';
import config from '../webpack.config.prod';

const runWebpack = () => new Promise((resolve, reject) => {
  webpack(config).run((error, stats) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(stats);
  });
});

const buildJs = async () => {
  const stats = await runWebpack();

  if (stats.compilation.errors.length) {
    throw Error('failed to compile!');
  }

  if (process.env.CI && stats.compilation.warnings.length) {
    throw Error('failed to compile');
  }

  console.log(chalk.green('Compiled successfully.\n'));

  return stats;
};

export default buildJs;
