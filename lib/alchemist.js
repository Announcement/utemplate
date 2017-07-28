'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// transmutating elements =)
var Alchemist = function () {
  function Alchemist(element) {
    _classCallCheck(this, Alchemist);

    this.setElement(element);
  }

  _createClass(Alchemist, [{
    key: 'setElement',
    value: function setElement(element) {
      this.element = Alchemist.asElement(element);
      return this;
    }
  }, {
    key: 'getElement',
    value: function getElement() {
      return this.element;
    }
  }], [{
    key: 'isQuerySelector',
    value: function isQuerySelector(element) {
      return typeof element === 'string';
    }
  }, {
    key: 'fromQuerySelector',
    value: function fromQuerySelector(element) {
      return document.querySelector(element);
    }
  }, {
    key: 'isSizzle',
    value: function isSizzle(element) {
      return typeof element === 'function';
    }
  }, {
    key: 'fromSizzle',
    value: function fromSizzle(element) {
      return element.get(0);
    }
  }, {
    key: 'isTemplate',
    value: function isTemplate(element) {
      return _helpers.is.element(element);
    }
  }, {
    key: 'fromTemplate',
    value: function fromTemplate(element) {
      return element.content;
    }
  }, {
    key: 'isFragment',
    value: function isFragment(element) {
      return _helpers.is.fragment(element) && element.hasChildNodes();
    }
  }, {
    key: 'fromFragment',
    value: function fromFragment(element) {
      return element.firstElementChild;
    }
  }, {
    key: 'asElement',
    value: function asElement(element) {
      var waterfall = [Alchemist.fromQuerySelector, Alchemist.fromSizzle, Alchemist.fromTemplate, Alchemist.fromFragment];

      var result = _helpers.as.decomposed(waterfall, element);

      // element is already provided
      if (result && _helpers.is.element(result)) {
        return result;
      }
    }
  }]);

  return Alchemist;
}();

exports.default = Alchemist;