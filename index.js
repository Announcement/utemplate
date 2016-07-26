var Template;
var Alchemist;
var Nudist;

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

    if (typeof scope !== 'undefined') {
      scope[input.name] = input;
    }
  };

  prototype.toString = function toString() {
    return '[object ' + this.name + ']'
  };

  function Nudist(program) {
    this.expose(program);
  }

  return Nudist;
}(this));

Alchemist = (function(element) {
  'use strict';

  var prototype;
  var constructor;

  var error;

  constructor = Alchemist;
  prototype = Alchemist.prototype;

  constructor.className = "Alchemist";

  error = {};
  error.invalidElement = "Invalid or unknown element was specified.";
  error.invalidElement = new Error(error.invalidElement);

  prototype.asElement = function asElement(element) {
    // find specified element
    if (element.constructor === String) {
      element = document.querySelector(element);
    }

    // it's a jQuery node
    if (typeof jQuery !== 'undefined' && element.constructor === jQuery) {
      element = element.get(0);
    }

    // html5 template content
    if (element instanceof Element && element.tagName === 'TEMPLATE') {
      element = element.content;
    }

    // defragment
    if (element instanceof DocumentFragment && element.hasChildNodes()) {
      element = element.firstElementChild;
    }

    // element is already provided
    if (element instanceof Element) {
      return element;
    }

    return error.invalidElement;
  };

  prototype.setElement = function setElement(element) {
    this.element = this.asElement(element);

    return this.element;
  };

  prototype.getElement = function getElement() {
    return this.element;
  };

  prototype.toString = function toString() {
    return '[object ' + this.name + ']';
  };

  function Alchemist(element) {
    this.setElement(element);
  }

  return Alchemist;
}());

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

        element.childNodes[i].textContent = compiled;
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
    var source;

    if (validate(data)) {

      element = this.element.cloneNode(true);
      resolve = this.crawl(element, data);

      html = element.innerHTML;

      properties = /\{([^}]+)\}/g;

      this.appendSources(data);

      source = btoa(JSON.stringify(data));

      element.template = this;
      element.rendered = source;

      return element;
    }
  };

  prototype.render = function() {
    this.sources.map(function(source) {
      this.pipeline.reduce(function(previous, current) {
        if (typeof current === 'function') {
          return current(previous);
        } else if (typeof current.childNodes !== 'undefined') {
          return (function(prepared, children) {
            for (var i = 0; i < children.length; i++) {
              if (typeof children[i].rendered !== 'undefined') {
                if (children[i].rendered === prepared.rendered) {
                  return current.replaceChild(prepared, children[i]);
                }
              }
            }
            current.appendChild(prepared);
            return prepared;
          }.call(this, this.prepare(previous), current.childNodes));
          //return previous;
        }
        return current(previous);
      }.bind(this), source);
    }.bind(this));
    this.sources = [];
    return this;
  };

  prototype.appendSources = function(object) {
    if (object.constructor === Array) {
      return object.map(this.appendSources);
    }

    this.sources.push(object);

    return object;
  };

  prototype.pipe = function pipe(flow) {
    // resolve duplicates
    var index;

    index = this.pipeline.indexOf(flow);

    switch(typeof flow) {
      case 'undefined':
        return false;
      case 'function':
        break;
      case 'object':
        this.appendSources(flow)
        return this;
      default:
        flow = Template.prototype.setElement(flow);
    }

    if (index !== -1) {
      this.pipeline.splice(index, 1, flow);
    } else {
      this.pipeline.push(flow);
    }

    this.render();

    return this;
  };

  prototype.initialize = function initialize() {
    this.pipeline = [];
    this.sources = [];
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

new Nudist(Template);
