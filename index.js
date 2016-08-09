'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

// transmutating elements =)
var Alchemist = function () {
	createClass(Alchemist, [{
		key: 'setElement',
		value: function setElement(element) {
			this.element = Alchemist.asElement(element);
		}
	}, {
		key: 'getElement',
		value: function getElement() {
			return this.element;
		}
	}], [{
		key: 'asElement',
		value: function asElement() {
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
		}
	}]);

	function Alchemist(element) {
		classCallCheck(this, Alchemist);

		this.setElement(element);
	}

	return Alchemist;
}();

// leeches off of the information...
var Parasite = function () {
	function Parasite(mutator) {
		classCallCheck(this, Parasite);

		this.setMutator(mutator);
	}

	createClass(Parasite, [{
		key: "getChildren",
		value: function getChildren(element) {
			return [].slice.call(element.childNodes, 0);
		}
	}, {
		key: "getAttributes",
		value: function getAttributes(element) {
			return [].slice.call(element.attributes, 0);
		}
	}, {
		key: "setChildren",
		value: function setChildren(element) {
			var _arguments = arguments;

			var mutator;
			var setChildren;
			var setAttributes;
			var children;

			mutator = this.mutator;
			setChildren = this.setChildren.bind(this);

			this.setAttributes(element);
			children = this.getChildren(element);

			children.forEach(function (child) {
				var result;

				if (child.nodeType === document.TEXT_NODE && child.textContent.trim().length > 0) {
					result = mutator.apply(child, [child.textContent, _arguments[1], children]);
				}

				if (child.nodeType === document.ELEMENT_NODE) {
					setChildren(child);
				}

				if (result !== undefined && result !== null) {
					child.textContent = result;
				}
			});
		}
	}, {
		key: "setAttributes",
		value: function setAttributes(element) {
			var mutator;
			var attributes;

			mutator = this.mutator;
			attributes = this.getAttributes(element);

			attributes.forEach(function (attribute) {
				var result;
				var name;
				var value;

				name = attribute.name;
				value = attribute.value;

				if (element.hasAttribute(name) && value.trim().length > 0) {
					result = mutator.apply(element, [attribute.value, attribute.name, attributes]);
				}

				if (result !== undefined && result !== null) {
					element.setAttribute(attribute.name, result);
				}
			});
		}
	}, {
		key: "infect",
		value: function infect(element) {
			return this.setChildren(element);
		}
	}, {
		key: "setMutator",
		value: function setMutator(mutator) {
			this.mutator = mutator;
		}
	}]);
	return Parasite;
}();

// expert on exposure ;)
var Nudist = function () {
    createClass(Nudist, null, [{
        key: 'expose',
        value: function expose(input) {
            if (typeof define === 'function') {
                define(input.name.toLowerCase(), [], function () {
                    return input;
                });
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
        }
    }]);

    function Nudist(program) {
        classCallCheck(this, Nudist);

        Nudist.expose(program);
    }

    return Nudist;
}();

// what we're actually dealing with.

var Template = function () {
	function Template(element) {
		classCallCheck(this, Template);

		this.pipeline = [];
		this.sources = [];

		this.alchemist = new Alchemist();

		this.setElement(element);
	}

	createClass(Template, [{
		key: 'setElement',
		value: function setElement(element) {
			if (typeof Alchemist !== 'undefined') {
				element = Alchemist.asElement(element);
			}

			this.element = element;

			return element;
		}
	}, {
		key: 'pipe',
		value: function pipe(flow) {
			// the 'good' stuff

			/*
      -> is it an event source
    -> is it an event
    -> is it data
    -> is it a handler
    -> is it a mutator
   		 -> when did it happen, before or after input?
    -> ...
   		 */
		}
	}]);
	return Template;
}();

new Nudist(Template);

module.exports = Template;