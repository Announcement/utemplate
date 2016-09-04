import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/ntemplate.js',
  format: 'umd',
  moduleName: 'Template',
  plugins: [
    json(),
    babel({
      babelrc: false,
      "presets": [
        [
          "es2015",
          {
            "modules": false
          }
        ]
      ],
      "plugins": ["external-helpers"]
    })
  ],
  dest: 'bin/index.js'
};
