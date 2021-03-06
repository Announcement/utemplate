import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import sourcemaps from 'rollup-plugin-sourcemaps'

export default {
  entry: 'src/template.js',
  format: 'es',
  moduleName: 'Template',
  sourceMap: true,
  plugins: [
    sourcemaps(),
    json(),
    babel({
      babelrc: false,
      'presets': [
        [
          'es2015',
          {
            'modules': false
          }
        ]
      ],
      'plugins': ['external-helpers']
    })
  ],
  dest: 'bin/index.js'
}
