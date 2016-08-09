import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/ntemplate.js',
  format: 'cjs',
  plugins: [ json(), babel() ],
  dest: 'index.js'
};
