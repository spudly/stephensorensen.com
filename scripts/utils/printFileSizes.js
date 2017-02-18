/* eslint-disable no-console */
import chalk from 'chalk';
import filesize from 'filesize';
import fs from 'fs-extra';
import getDifferenceLabel from './getDifferenceLabel';
import {sync as gzipSize} from 'gzip-size'; // TODO: use async versin
import path from 'path';
import pify from 'pify';
import removeFileNameHash from './removeFileNameHash';
import stripAnsi from 'strip-ansi';

const readFile = pify(fs.readFile);

const BUILD = path.join(__dirname, '../../build');

const printFileSizes = async (stats, previousSizeMap) => {
  const assets = await Promise.all(
    stats
      .toJson()
      .assets.filter(asset => /\.js$/.test(asset.name))
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
      }),
  );
  assets.sort((a, b) => b.size - a.size);
  const sizeLabelLengths = assets.map(a => stripAnsi(a.sizeLabel).length);
  const longestSizeLabelLength = Reflect.apply(
    Math.max,
    null,
    sizeLabelLengths,
  );
  assets.forEach(asset => {
    let {sizeLabel} = asset;
    const sizeLength = stripAnsi(sizeLabel).length;
    if (sizeLength < longestSizeLabelLength) {
      const rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
      sizeLabel += rightPadding;
    }
    console.log(
      `  ${sizeLabel}  ${chalk.dim(asset.folder + path.sep)}${chalk.cyan(
        asset.name,
      )}`,
    );
  });
};

export default printFileSizes;
