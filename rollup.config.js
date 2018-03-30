import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import server from 'rollup-plugin-server';

export default {
  input: 'src/index.js',
  output: {
    file: 'build/index.js',
    format: 'cjs',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
    cjs({
      include: 'node_modules/**',
      namedExports: {react: ['Children', 'Fragment']},
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    builtins(),
    globals(),
    server({
      open: true,
      contentBase: '.',
      historyApiFallback: true,
      host: 'localhost',
      port: 8080,
    }),
  ],
};
