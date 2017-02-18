import fs from 'fs-extra';
import path from 'path';
import pify from 'pify';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';

const BUILD = path.join(__dirname, '../../build'); // TODO: make a paths file with these in it
const SRC = path.join(__dirname, '../../src'); // TODO: make a paths file with these in it
const outputFile = pify(fs.outputFile);
const readFile = pify(fs.readFile);
// import cssnano from 'cssnano';

const buildCss = async () => {
  const plugins = [postcssImport, autoprefixer/* , cssnano*/];
  const css = await readFile(`${SRC}/index.css`);
  const result = await postcss(plugins).process(css, {
    from: `${SRC}/index.css`,
    to: `${BUILD}/index.css`,
  });
  await outputFile(`${BUILD}/index.css`, result.css);
};

export default buildCss;
