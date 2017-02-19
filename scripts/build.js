/* eslint-disable no-console */
import fs from 'fs-extra';
import pify from 'pify';
import buildCss from './utils/buildCss';
import buildClientJs from './utils/buildClientJs';
import buildServerJs from './utils/buildServerJs';
import buildPages from './utils/buildPages';
import {SRC, BUILD} from './utils/paths';
import uniqueId from 'uuid/v4';
import {join} from 'path';

const emptyDir = pify(fs.emptyDir);
const copy = pify(fs.copy);

const build = async () => {
  const buildId = uniqueId();

  await emptyDir(BUILD);
  await buildServerJs(buildId);

  await Promise.all([
    copy(join(SRC, 'data'), join(BUILD, 'data')),
    buildClientJs(buildId),
    buildCss(),
    buildPages(buildId),
  ]);
};

build().catch(error => {
  process.exitCode = 1;
  console.error(error);
});
