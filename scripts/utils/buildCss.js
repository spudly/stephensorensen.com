import fs from 'fs-extra';
import pify from 'pify';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import {SRC, BUILD} from './paths';

const outputFile = pify(fs.outputFile);
const readFile = pify(fs.readFile);
// TODO: reenable cssnano
// import cssnano from 'cssnano';

const buildCss = async () => {
  const plugins = [postcssImport];
  const css = await readFile(`${SRC}/css/index.css`);
  const result = await postcss(plugins).process(css, {
    from: `${SRC}/css/index.css`,
    to: `${BUILD}/css/index.css`,
  });
  await outputFile(`${BUILD}/index.css`, result.css);
};

export default buildCss;
