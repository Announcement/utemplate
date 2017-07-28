'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var nano = function () {
  function nano(element) {
    _classCallCheck(this, nano);

    this.rendered = [];

    this.setTemplate(element);
  }

  _createClass(nano, [{
    key: 'setTemplate',
    value: function setTemplate(it) {
      var element = void 0;

      element = _alchemist2.default.asElement(it);
      this.template = element;

      return element;
    }
  }, {
    key: 'getTemplate',
    value: function getTemplate() {
      return this.template;
    }
  }, {
    key: 'fromObject',
    value: function fromObject(object) {
      var template = void 0;
      var cloned = void 0;
      var parasite = void 0;
      var element = void 0;
      var packet = void 0;

      template = this.getTemplate();
      cloned = template.cloneNode(true);
      parasite = new _parasite2.default(genetics(object));

      element = parasite.infect(cloned);

      packet = {
        'object': object,
        'element': element,
        'parasite': parasite
      };

      this.rendered.push(packet);

      return element;
    }
  }, {
    key: 'setOutput',
    value: function setOutput(it) {
      var _this = this;

      var element = void 0;
      var that = void 0;

      element = _alchemist2.default.asElement(it);

      var append = function append(it) {
        return it.parasite.addChildren(element);
      };
      var getNext = function getNext(it) {
        return _this.rendered.shift();
      };

      while (this.rendered.length) {
        setContent(getValue());
      }
    }
  }]);

  return nano;
}();

exports.default = nano;