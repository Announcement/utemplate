'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _package = require('../package.json');

var _alchemist = require('./alchemist');

var _alchemist2 = _interopRequireDefault(_alchemist);

var _parasite = require('./parasite');

var _parasite2 = _interopRequireDefault(_parasite);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var query = function query(object, property) {
  var regexp = /[.{}]/g;
  var filter = function filter(source) {
    return source;
  };
  var reduce = function reduce(source, key) {
    return source[key];
  };

  return property.split(regexp).filter(filter).reduce(reduce, object);
};

var compile = function compile(value, data) {
  var regexp = /\{([^}]+)\}/g;

  var replacement = function replacement(original, property) {
    return query(data, property) || '';
  };

  return value.trim().replace(regexp, replacement);
};

var genetics = function genetics(source) {
  return function (input) {
    return compile(input, source);
  };
};

var Milli = function () {
  function Milli(source) {
    _classCallCheck(this, Milli);

    this.source = _alchemist2.default.asElement(source);
    this.methods = [];
    this.sources = [];
  }

  _createClass(Milli, [{
    key: 'setMutations',
    value: function setMutations(source) {
      var methods = void 0;

      methods = this.methods;
    }
  }, {
    key: 'setSources',
    value: function setSources(method) {
      var sources = void 0;

      sources = this.sources.map(method);

      this.sources = sources;
    }
  }, {
    key: 'provide',
    value: function provide() {
      var output = void 0;

      output = this.output;

      if (_helpers.is.not.existant(output)) {
        return false;
      }

      this.setSources(function (source) {
        if (_helpers.is.existant(source.children)) {
          return source;
        }

        var parasite = void 0;
        var compiled = void 0;
        var children = void 0;

        parasite = source.parasite;
        compiled = source.compiled;

        children = parasite.addChildren(output);
        source.children = children;

        return source;
      });
    }
  }, {
    key: 'generate',
    value: function generate() {
      var template = void 0;
      var methods = void 0;

      template = this.source;
      methods = this.methods;

      var isInfected = function isInfected(it) {
        var content = it.parsed || it.content;

        if (_helpers.is.not.existant(it.parasite)) {
          it.parasite = new _parasite2.default(genetics(content));
        }

        return it.parasite;
      };

      var isCompiled = function isCompiled(it) {
        if (_helpers.is.not.existant(it.compiled)) {
          var cloned = template.cloneNode(true);
          var element = it.parasite.infect(cloned);
        }

        return it.compiled;
      };

      var eachMutation = function eachMutation(it) {
        var result = void 0;

        result = methods.reduce(function (previous, current, index) {
          var rendered = void 0;

          rendered = current(previous);
          it.mutations[index] = rendered;

          return rendered || previous;
        }, it.content);

        it.parsed = result;

        return result;
      };

      var isMutation = function isMutation(it) {
        if (_helpers.is.not.existant(it.mutations)) {
          it.mutations = [];
        }

        if (it.mutations.length < methods.length) {
          eachMutation(it);
        }

        return it.mutations;
      };

      this.setSources(function (source) {
        var mutation = isMutation(source);
        var infected = isInfected(source);
        var compiled = isCompiled(source);

        return source;
      });
    }
  }, {
    key: 'setDestination',
    value: function setDestination(it) {
      var element = void 0;

      element = _alchemist2.default.asElement(it);

      if (_helpers.is.not.existant(element)) {
        return false;
      }

      this.output = element;

      if (this.sources.length > 0) {
        this.provide();
      }

      return element;
    }
  }, {
    key: 'fromObject',
    value: function fromObject(it) {
      var packet = void 0;

      if (it.constructor !== Object) {
        return false;
      }

      packet = {};
      packet.content = it;

      this.sources.push(packet);

      this.generate();
      this.provide();

      return it;
    }
  }, {
    key: 'fromMethod',
    value: function fromMethod(it) {
      if (it.constructor !== Function) {
        return false;
      }

      this.generate();
      this.methods.push(it);

      return it;
    }
  }, {
    key: 'pipe',
    value: function pipe(object) {
      var _this = this;

      var waterfall = void 0;
      var result = void 0;

      waterfall = [this.setDestination, this.fromObject, this.fromMethod];

      waterfall.some(function (method) {
        return result = method.call(_this, object);
      });

      return this;
    }
  }], [{
    key: 'version',
    get: function get() {
      return _package.version;
    }
  }]);

  return Milli;
}();

exports.default = Milli;