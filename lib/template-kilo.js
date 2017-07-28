'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import {is, as} from 'helpers'

// import Symbiotic from './symbiotic'

var _package = require('../package.json');

var _alchemist = require('./alchemist');

var _alchemist2 = _interopRequireDefault(_alchemist);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kilo = function () {
  function Kilo(source) {
    _classCallCheck(this, Kilo);

    this.source = _alchemist2.default.asElement(source);

    this.cache = new _cache2.default();

    this.methods = [];
    this.sources = [];
  }

  _createClass(Kilo, [{
    key: 'synchronize',
    value: function synchronize() {
      var sources = this.sources;
      var methods = this.methods;
      var cache = this.cache;

      var cells = _cache2.default.multiply(sources, methods);
      var updates = cache.update(cells);

      console.log(updates);
    }
  }, {
    key: 'addSource',
    value: function addSource(source) {
      this.sources.push(source);
      this.synchronize();
    }
  }, {
    key: 'addSources',
    value: function addSources() {
      var _this = this;

      for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      sources.forEach(function (it) {
        return _this.sources.push(it);
      });
      this.synchronize();
    }
  }, {
    key: 'addMethod',
    value: function addMethod(method) {
      this.methods.push(method);
    }
  }, {
    key: 'addMethods',
    value: function addMethods() {
      var _this2 = this;

      for (var _len2 = arguments.length, methods = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        methods[_key2] = arguments[_key2];
      }

      methods.forEach(function (it) {
        return _this2.methods.push(it);
      });
      this.synchronize();
    }
  }], [{
    key: 'version',
    get: function get() {
      return _package.version;
    }
  }]);

  return Kilo;
}();

exports.default = Kilo;