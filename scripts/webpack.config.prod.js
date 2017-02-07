import path from 'path';
import webpack from 'webpack';

const SRC = path.join(__dirname, '../src');
const BUILD = path.join(__dirname, '../build');

const config = {
  bail: true,
  devtool: 'source-map',
  entry: `${SRC}/index.js`,
  module: {
    loaders: [
      {
        include: SRC,
        loader: 'babel-loader',
        test: /\.js$/,
      },
      {
        loader: 'json-loader',
        test: /\.json$/,
      },
    ],
    // rules: [
    //   {
    //     include: SRC,
    //     loader: 'eslint-loader',
    //     enforce: 'pre',
    //     test: /\.js$/,
    //   },
    // ],
  },
  output: {
    filename: 'index.js',
    path: BUILD,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
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
    }),
  ],
};

export default config;
