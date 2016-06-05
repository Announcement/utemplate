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
(function(program){
  'use strict';

  if (typeof Nudist === 'undefined') {
    this.queue = this.queue || []
    return this.queue.push(program);
  }

  return new Nudist(program, this);
}).call(this, Template);
