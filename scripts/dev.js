process.env.NODE_ENV = 'development';

const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const config = require('../config/webpack.config.dev');
const paths = require('../config/paths');

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
const PROTOCOL = process.env.HTTPS === 'true' ? "https" : "http";
const HOST = process.env.HOST || 'localhost';
const compiler = setupCompiler(HOST, PORT, PROTOCOL);

function setupCompiler(host, port, protocol) {
  const compiler = webpack(config);

  compiler.plugin('invalid', function() { // means a file changed so the bundle is invalidated
    console.log('Compiling...');
  });

  let isFirstCompile = true;

  compiler.plugin('done', stats => {
    var messages = formatWebpackMessages(stats.toJson({}, true));
    var isSuccessful = !messages.errors.length && !messages.warnings.length;
    var showInstructions = isSuccessful && isFirstCompile;

    if (isSuccessful) {
      console.log(chalk.green('Compiled successfully!'));
    }

    if (showInstructions) {
      console.log();
      console.log('The app is running at:');
      console.log();
      console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'), '\n');
      console.log();
      isFirstCompile = false;
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'), '\n');
      messages.errors.forEach(message => colsole.log(message, '\n'));
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'), '\n');
      messages.warnings.forEach(message => console.log(message, '\n'));
    }
  });
  return compiler;
}

var devServer = new WebpackDevServer(compiler, {
  compress: true, // gzip
  clientLogLevel: 'info',
  contentBase: path.join(__dirname, '../static'),
  hot: true,
  publicPath: config.output.publicPath,
  quiet: false,
  watchOptions: {
    ignored: /node_modules/,
  },
  https: PROTOCOL === "https",
  host: HOST,
});

devServer.use(devServer.middleware);

devServer.listen(PORT, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(chalk.cyan('Starting the development server...'), '\n');
});