import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const SRC = path.join(__dirname, '../src');
const BUILD = path.join(__dirname, '../build');
const TEMPLATE = path.join(__dirname, '../scripts/dev-template.html');

const config = {
  devtool: 'cheap-module-source-map',
  entry: [require.resolve('react-dev-utils/webpackHotDevClient'), `${SRC}/index.js`],
  module: {
    loaders: [
      {
        include: SRC,
        loader: 'babel',
        query: {
          cacheDirectory: true,
        },
        test: /\.js$/,
      },
      {
        loader: 'json',
        test: /\.json$/,
      },
    ],
    preLoaders: [
      {
        include: SRC,
        loader: 'eslint',
        test: /\.js$/,
      },
    ],
  },
  output: {
    filename: 'static/js/bundle.js',
    path: BUILD,
    pathinfo: true,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: TEMPLATE,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

export default config;
