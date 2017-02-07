const filesize = require('filesize');
const chalk = require('chalk');

const FIFTY_KILOBYTES = 1024 * 50;

function getDifferenceLabel(currentSize, previousSize) {
  const difference = currentSize - previousSize;
  const fileSize = !Number.isNaN(difference) ? filesize(difference) : 0;
  if (difference >= FIFTY_KILOBYTES) {
    return chalk.red(`+${fileSize}`);
  } else if (difference < FIFTY_KILOBYTES && difference > 0) {
    return chalk.yellow(`+${fileSize}`);
  } else if (difference < 0) {
    return chalk.green(fileSize);
  }
  return '';
}

module.exports = getDifferenceLabel;