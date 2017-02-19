/* eslint-disable no-console */

import chalk from 'chalk';
import webpack from 'webpack';
import {SRC, BUILD} from './paths';

const buildWebPackConfig = buildId => ({
  bail: true,
  devtool: 'source-map',
  entry: {
    'index.client': `${SRC}/index.client.js`,
    'index.sw': `${SRC}/index.sw.js`,
  },
  module: {
    rules: [
      {
        include: SRC,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            'react',
            [
              'env',
              {
                targets: {
                  browsers: ['last 2 versions'],
                },
              },
            ],
            'stage-2',
          ],
        },
        test: /\.js$/,
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: BUILD,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_ID: `"${buildId}"`,
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: true,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
      sourceMap: false,
    }),
  ],
});

const runWebpack = config => new Promise((resolve, reject) => {
  webpack(config).run((error, stats) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(stats);
  });
});

const buildClientJs = async buildId => {
  const config = buildWebPackConfig(buildId);
  const stats = await runWebpack(config);

  const errors = [
    ...stats.compilation.errors,
    // ...stats.compilation.warnings,
  ];

  if (errors.length) {
    errors.forEach(error => {
      console.error(chalk.red(error.message), error.stack);
    });
  } else {
    console.log(chalk.green('Compiled successfully.\n'));
  }

  return stats;
};

export default buildClientJs;
