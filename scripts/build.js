/* eslint-disable no-console */
import fs from 'fs-extra';
import path from 'path';
import pify from 'pify';
import buildCss from './utils/buildCss';
import buildJs from './utils/buildJs';
import buildPages from './utils/buildPages';
import printFileSizes from './utils/printFileSizes';
import getPreviousSizeMap from './utils/getPreviousSizeMap';

const BUILD = path.join(__dirname, '../build');
const STATIC = path.join(__dirname, '../static');

const copy = pify(fs.copy);
const outputFile = pify(fs.outputFile);
const emptyDir = pify(fs.emptyDir);

const copyStaticFolder = () => copy(STATIC, BUILD, {dereference: true});

const writeBuildData = ({hash}) =>
  outputFile(`${BUILD}/buildData.json`, JSON.stringify({hash}));

const build = async () => {
  const previousSizeMap = await getPreviousSizeMap();
  await emptyDir(BUILD);

  const [stats] = await Promise.all([
    buildJs(),
    buildCss(),
    copyStaticFolder(),
  ]);

  await Promise.all([
    writeBuildData({hash: stats.hash}),
    buildPages(stats.hash),
    // TODO: build sitemap.txt
    // TODO: build manifest file
  ]);

  console.log('File sizes after gzip:\n');
  await printFileSizes(stats, previousSizeMap);
  console.log();
};

build().catch(error => {
  throw error;
});
