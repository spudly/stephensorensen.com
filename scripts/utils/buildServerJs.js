import cp from 'child_process';
import pify from 'pify';
import {ROOT} from './paths';

const exec = pify(cp.exec);

const buildServerJs = buildId => exec('./node_modules/.bin/babel src -d build', {
  cwd: ROOT,
  env: {...process.env, BUILD_ID: buildId},
});

export default buildServerJs;
