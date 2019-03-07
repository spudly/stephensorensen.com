const {resolve} = require('path');

module.exports = {
  entry: './src/js/client-side/index.tsx',
  output: {
    path: resolve(__dirname, 'build/js/client-side'),
    filename: 'index.js',
    publicPath: '/',
  },
  module: {
    rules: [{test: /\.tsx?$/, use: {loader: 'ts-loader', options: {transpileOnly: true}}}],
  },
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
