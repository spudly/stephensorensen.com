import filesize from 'filesize';
import chalk from 'chalk';

const FIFTY_KILOBYTES = 1024 * 50;

const getDifferenceLabel = (currentSize, previousSize) => {
  const difference = currentSize - previousSize;
  const fileSize = Number.isNaN(difference) ? 0 : filesize(difference);
  if (difference >= FIFTY_KILOBYTES) {
    return chalk.red(`+${fileSize}`);
  } else if (difference < FIFTY_KILOBYTES && difference > 0) {
    return chalk.yellow(`+${fileSize}`);
  } else if (difference < 0) {
    return chalk.green(fileSize);
  }
  return '';
};

export default getDifferenceLabel;
