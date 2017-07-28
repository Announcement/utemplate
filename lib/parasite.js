'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // leeches off of the information...


var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parasite = function () {
  function Parasite(mutator) {
    _classCallCheck(this, Parasite);

    this.setMutator(mutator);
  }

  _createClass(Parasite, [{
    key: 'getChildren',
    value: function getChildren(element) {
      // Extternal helpers::as.array

      if (typeof element.content !== 'undefined') {
        element = element.content;
      }

      return _helpers.as.array(element.childNodes);
    }
  }, {
    key: 'allChildren',
    value: function allChildren(element) {
      // External helpers::is.element helpers::as.flatten
      // Dependencies: getChildren

      var map = function (child) {
        return !_helpers.is.element(child) ? child : this.allChildren(child);
      }.bind(this);

      var children = this.getChildren(element).map(map);

      return _helpers.as.flatten(children);
    }
  }, {
    key: 'getAttributes',
    value: function getAttributes(element) {
      // External helpers::as.array

      return _helpers.as.array(element.attributes);
    }
  }, {
    key: 'setChildren',
    value: function setChildren(element) {
      // External: helpers::is.element helpers::is.existant

      var attributes = this.setAttributes(element);
      var children = this.getChildren(element);

      for (var key in children) {
        var child = children[key];
        var result = void 0;

        if (_helpers.is.text(child)) {
          if (child.textContent.trim().length > 0) {
            result = this.mutator.apply(child, [child.textContent, arguments[1], children]);
          }
        }

        if (_helpers.is.element(child)) {
          this.setChildren(child);
        }

        if (_helpers.is.existant(result)) {
          child.textContent = result;
        }
      };

      return element;
    }
  }, {
    key: 'setAttributes',
    value: function setAttributes(element) {
      // External: helpers::is.existant
      // Dependencies: getAttributes

      var attributes = this.getAttributes(element);

      for (var index in attributes) {
        var attribute = attributes[index];
        var result = void 0;
        var name = void 0;
        var value = void 0;

        name = attribute.name;
        value = attribute.value;

        if (element.hasAttribute(name) && value.trim().length > 0) {
          result = this.mutator.apply(element, [attribute.value, attribute.name, attributes]);
        }

        if (_helpers.is.existant(result)) {
          element.setAttribute(attribute.name, result);
        }
      }

      return attributes;
    }
  }, {
    key: 'infect',
    value: function infect(element) {
      // Dependencies: setChildren

      element = this.setChildren(element);

      this.infection = element;

      return element;
    }
  }, {
    key: 'addChildren',
    value: function addChildren(element) {
      // External: helpers::is.not.equal
      // Dependencies: getChildren

      var infection = void 0;
      var children = void 0;
      var sibilings = void 0;

      children = this.getChildren(this.infection);
      sibilings = this.getChildren(element);

      var _loop = function _loop(index) {
        var child = children[index];
        sibilings.every(function (it) {
          return _helpers.is.not.equal(child, it);
        }) && element.appendChild(child);
      };

      for (var index in children) {
        _loop(index);
      }

      return children;
    }
  }, {
    key: 'setMutator',
    value: function setMutator(mutator) {
      this.mutator = mutator;
    }
  }]);

  return Parasite;
}();

exports.default = Parasite;