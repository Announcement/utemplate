var Template;
var Alchemist;

Alchemist = require('./alchemist');

Template = (function(element) {
  'use strict';

  var prototype;
  var constructor;

  constructor = Template;
  prototype = Template.prototype;

  constructor.className = "Template";

  function query(object, property) {
    var regex;
    var filter;
    var reduce;

    regex = /[.{}]/g;
    filter = function filter(source) { return source; };
    reduce = function reduce(source, key) { return source[key]; };

    return property
      .split(regex)
      .filter(filter)
      .reduce(reduce, object);
  }

  prototype.setElement = function setElement(element) {
    if (typeof Alchemist !== 'undefined') {
      element = Alchemist.prototype.asElement(element);
    }

    this.element = element;

    return element;
  };

  prototype.compile = function compile(value, data) {
    var regex;
    var replacement;

    regex = /\{([^}]+)\}/g;

    replacement = function replacement(original, property) {
      return query(data, property);
    };

    value = value.trim();
    value = value.replace(regex, replacement);

    return value;
  };

  prototype.crawl = function crawl(element, data) {
    var doAttributes;
    var doChildren;

    var self, args;

    self = this;
    args = arguments;

    doAttributes = function doAttributes(element) {
      var attributes;
      var attribute;

      var loop;

      loop = function loop(attribute) {
        var compiled;

        if (element.hasAttribute(attribute.name)) {
          compiled = self.compile(attribute.value, data);
          element.setAttribute(attribute.name, compiled);
        }
      };

      attributes = ([]).slice.call(element.attributes, 0);

      return attributes.map(loop);
    };

    doChildren = function doChildren() {
      var textNode = document.TEXT_NODE;
      var elementNode = document.ELEMENT_NODE;

      var setElement;
      var setTextNode;

      var children;
      var child;

      var loop;
      var fixElement;
      var fixTextNode;

      setElement = function setElement(child, i, data) {
        element.childNodes[i] = self.crawl(child, data);
      };

      setTextNode = function setTextNode(child, i, data) {
        var compiled;

        compiled = self.compile(child.textContent, data);

        element.childNodes[i].textContent = compiled.textContent;
      };

      loop = function loop(child, i) {
        if(child.nodeType === textNode) {
          setTextNode(child, i, data);
        }
        if (child.nodeType === elementNode) {
          setElement(child, i, data);
        }
      };

      children = ([]).slice.call(element.childNodes, 0);

      return children.map(loop);
    };

    if (element.hasAttributes()) {
      doAttributes(element, data);
    }

    if (element.hasChildNodes()) {
      doChildren(element, data);
    }

    return element;
  };

  function hasProperties(object, array) {
    var areMissing;

    areMissing = function areMissing(property) {
        return !object.hasOwnProperty(property);
    };

    return array.some(areMissing);
  }

  function validate(data) {
    if (!data) {
      return false;
    }
    return true;
  }

  prototype.prepare = function prepare(data) {
    var element;
    var html;
    var properties;
    var resolve;

    if (validate(data)) {

      element = this.element.cloneNode(true);
      resolve = this.crawl(element, data);

      html = element.innerHTML;

      properties = /\{([^}]+)\}/g;

      return element;
    }
  };

  prototype.pipe = function pipe() {
    // resolve duplicates
    // this.pipeline.push(flow);
  };

  prototype.initialize = function initialize() {
    this.pipeline = [];
  };

  prototype.toString = function toString() {
    return '[object ' + this.name + ']';
  };

  function Template(element) {
    this.initialize();
    this.setElement(element);
  }

  return Template;
}());

module.exports = Template;
