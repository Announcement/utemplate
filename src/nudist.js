// You will probably never have to touch this file...
// It detects the environment and service and exports the module accordingly.

Nudist = (function(scope) {
  'use strict';

  var prototype;
  var constructor;

  constructor = Nudist;
  prototype = Nudist.prototype;

  constructor.className = 'Nudist';

  prototype.expose = function expose(input, scope) {
    if (typeof define === 'function') {
      define(input.name.toLowerCase(), [], function () { return input; } );
    }

    if (typeof module !== 'undefined') {
      module.exports = input;
    }

    if (typeof window !== 'undefined') {
      window[input.name] = input;
    }

    if (typeof global !== 'undefined') {
      global[input.name] = input;
    }

    scope[input.name] = input;
  };

  prototype.toString = function toString() {
    return '[object ' + this.name + ']'
  };

  function Nudist(program) {
    this.expose(program);
  }

  return Nudist;
}(this));

(function() {
  if (!!this.queue) {
    for (var i = 0; i < this.queue.length; i++) {
      new Nudist(this.queue[i], this);
    }
  }
}).call(this);

new Nudist(Nudist, this);
