import path from 'path';
import webpack from 'webpack';

const SRC = path.join(__dirname, '../src');
const BUILD = path.join(__dirname, '../build');

const config = {
  bail: true,
  devtool: 'source-map',
  entry: {
    index: `${SRC}/index.js`,
    serviceWorker: `${SRC}/serviceWorker.js`,
  },
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
    filename: '[name].js',
    path: BUILD,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.ExtendedAPIPlugin(),
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
      sourceMap: true,
    }),
  ],
};

export default config;
