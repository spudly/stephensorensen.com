var webpack = require('webpack');
var url = require('url');
const path = require('path');

const SRC = path.join(__dirname, '../src');
const BUILD = path.join(__dirname, '../build');

module.exports = {
  // bail: true,
  // devtool: 'source-map',
  entry: `${SRC}/index.js`,
  output: {
    path: BUILD,
    filename: 'index.js',
  },
  // resolve: {
  //   extensions: ['.js', '.json'],
  // },
  module: {
  //   preLoaders: [
  //     // {
  //     //   test: /\.js$/,
  //     //   loader: 'eslint',
  //     //   include: SRC,
  //     // }
  //   ],
    loaders: [
      {
        test: /\.js$/,
        include: SRC,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  },
  // plugins: [
  //   // new webpack.DefinePlugin({
  //   //   'process.env': {
  //   //     'NODE_ENV': '"production"'
  //   //   }
  //   // }),
  //   // // This helps ensure the builds are consistent if source hasn't changed:
  //   // new webpack.optimize.OccurrenceOrderPlugin(),
  //   // // Try to dedupe duplicated modules, if any:
  //   // new webpack.optimize.DedupePlugin(),
  //   // // Minify the code.
  //   // new webpack.optimize.UglifyJsPlugin({
  //   //   compress: {
  //   //     screw_ie8: true,
  //   //     warnings: false
  //   //   },
  //   //   mangle: {
  //   //     screw_ie8: true
  //   //   },
  //   //   output: {
  //   //     comments: false,
  //   //     screw_ie8: true
  //   //   }
  //   // }),
  // ],
  // // Some libraries import Node modules but don't use them in the browser.
  // // Tell Webpack to provide empty mocks for them so importing them works.
  // // node: {
  // //   fs: 'empty',
  // //   net: 'empty',
  // //   tls: 'empty'
  // // }
};
