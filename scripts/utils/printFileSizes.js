const chalk = require('chalk');
const pify = require('pify');
const fs = require('fs-extra');
const path = require('path');
const gzipSize = require('gzip-size').sync; // TODO: async version
const readFile = pify(fs.readFile);
const removeFileNameHash = require('./removeFileNameHash');
const getDifferenceLabel = require('./getDifferenceLabel');
const filesize = require('filesize');
const stripAnsi = require('strip-ansi');

const BUILD = path.join(__dirname, '../../build');

const printFileSizes = async (stats, previousSizeMap) => {
  const assets = await Promise.all(
    stats.toJson().assets
      .filter(asset => /\.js$/.test(asset.name))
      .map(async asset => {
        const fileContents = await readFile(`${BUILD}/${asset.name}`);
        const size = gzipSize(fileContents);
        const previousSize = previousSizeMap[removeFileNameHash(asset.name)];
        const difference = getDifferenceLabel(size, previousSize);
        return {
          folder: path.join('build', path.dirname(asset.name)),
          name: path.basename(asset.name),
          size,
          sizeLabel: filesize(size) + (difference ? ` (${difference})` : ''),
        };
      })
  );
  assets.sort((a, b) => b.size - a.size);
  const longestSizeLabelLength = Math.max.apply(null, assets.map(a => stripAnsi(a.sizeLabel).length));
  assets.forEach(asset => {
    let sizeLabel = asset.sizeLabel;
    const sizeLength = stripAnsi(sizeLabel).length;
    if (sizeLength < longestSizeLabelLength) {
      const rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
      sizeLabel += rightPadding;
    }
    console.log(`  ${sizeLabel}  ${chalk.dim(asset.folder + path.sep)}${chalk.cyan(asset.name)}`);
  });
};

module.exports = printFileSizes;