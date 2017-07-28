'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _share = require('./share');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slow = function () {
  function Slow(template) {
    _classCallCheck(this, Slow);

    this.source = template;
    this.methods = [];
    this.sources = [];
  }

  _createClass(Slow, [{
    key: 'generate',
    value: function generate() {
      var sources;
      var methods;

      sources = this.sources;
      methods = this.methods;

      return sources.map(function (source) {
        var cache;

        cache = methods.map(function (method) {
          return { source: source, method: method };
        });

        var item;
        var items;
        var current;

        item = cache.shift();

        item.response = item.method(item.source);

        items = [item];

        while (cache.length) {
          current = cache.shift();
          current.response = current.method(item.response);
          items.push(current);
          item = current;
        }

        return items;
      });
    }
  }]);

  return Slow;
}();

var sources = ['a', 'b'];
var methods = [function (x) {
  return x + 'y';
}, function (x) {
  return x + 'z';
}];

function generate() {
  return sources.map(function (source) {
    var cache;

    cache = methods.map(function (method) {
      return { source: source, method: method };
    });

    var item;
    var items;
    var current;

    item = cache.shift();

    item.response = item.method(item.source);

    items = [item];

    while (cache.length) {
      current = cache.shift();

      current.response = current.method(item.response);

      items.push(current);

      item = current;
    }

    return items;
  });
}

generate();

exports.default = Slow;