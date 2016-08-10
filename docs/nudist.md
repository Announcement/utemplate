# Nudist

## Preface

Nudist was written immediately after utemplate and alchemist split up.
Since the actual block to export things properly was a pretty marginal size.
This program takes readability of source code as a high priority.

## What it does

Exports a module via commonjs, `global`, **AMD** or `window` with a fallback to `this`


~~~ javascript
  (function(program) {
    'use strict';

    if (typeof Nudist === 'undefined') {
      this.queue = this.queue || []
      return this.queue.push(program);
    }

    return new Nudist(program, this);
  }).call(this, myProgram); // replace myProgram with your desired export
~~~


## Notes
- it probably won't work unless it is on the top layer
- this is an *alternative* the the synchronous commonjs model, and does not require you use webpack or browserify; it is fully compatible if you do choose to opt-in.
- Brought back with version 2.1.0, can export modules along side our default rollup if needed.
