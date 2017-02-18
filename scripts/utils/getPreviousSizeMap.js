import _recursiveReadDir from 'recursive-readdir';
import pify from 'pify';
import path from 'path';
import fs from 'fs-extra';
import _gzipSize from 'gzip-size';

const gzipSize = pify(_gzipSize);
const recursiveReadDir = pify(_recursiveReadDir);
const BUILD = path.join(__dirname, '../../build');
const readFile = pify(fs.readFile);

const isJs = file => /[.]js$/.test(file);

const reduceFileSizeMap = (fileSizeMap, {filePath, size}) => ({
  ...fileSizeMap,
  [filePath]: size,
});

const getGzippedFileSize = async filePath => {
  const contents = await readFile(filePath);
  return gzipSize(contents);
};

const getFileInfo = async filePath => ({
  filePath,
  size: await getGzippedFileSize(filePath),
});

const getPreviousSizeMap = async () => {
  const filePaths = await recursiveReadDir(BUILD);

  const files = await Promise.all(
    (filePaths || [])
      .filter(isJs)
      .map(getFileInfo)
  );

  return files.reduce(reduceFileSizeMap, {});
};

export default getPreviousSizeMap;
