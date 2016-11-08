(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Nano = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};





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







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/** @module helpers */

/**
 * Lazy way of turning an item into an Array
 * @function array$
 *
 * @param {Object} it - Array like object
 *
 * @return {Array}
 */
var array$ = function array$(it) {
  return Array.prototype.slice.call(it, 0);
};

/**
 * Appends values to an Array,
 * but first replaces undefined values before adding to the end
 *
 * @function combine
 *
 * @param {Array} array - list of existing items
 * @param {Array} values - proposed additions to the lsit
 *
 * @return {Array}
 */
function combine(array, values) {
  var index;

  array = array.concat([]);

  while ((index = array.indexOf(undefined)) !== -1 && values.length > 0) {
    array[index] = values.shift();
  }

  return array.concat(values);
}

/**
 * Returns a modified function that can be called with currying
 *
 * @function curry
 *
 * @see array$
 *
 * @param {Function} method - function to be curried
 *
 * @return {Function}
 */
function curry$(method) {
  function transform(params) {
    var context;
    return function () {
      var args = combine(params, array$(arguments));
      context = context || this;

      if (args.length < method.length || args.some(function (it) {
        return it === undefined;
      })) {
        return transform(args);
      } else {
        return method.apply(context, args);
      }
    };
  }
  return method.length <= 1 ? method : transform([]);
}

/**
 * Returns a modified version of a function with negated boolean output
 *
 * @function negated
 *
 * @param {Function} it - method to be negated
 *
 * @return {Function}
 */
function negated$(it) {
  return function () {
    return !it.apply(this, arguments);
  };
}

/**
 * Pairs an object into a set of {key, value} arrays
 *
 * @function pair
 *
 * @param {Object} object - collection to be paired
 *
 * @return {Array.<{name: string, value}>}
 */
function pair(object) {
  return Object.keys(object).map(function (key) {
    return { key: key, value: object[key] };
  });
}

/**
 * Curried shortcut to hasOwnProperty
 *
 * @function has
 *
 * @param {Object} object - collection containing property
 * @param {String} property - property name to be checked
 *
 * @return {boolean}
 */

var has = curry$(function (object, property) {
  return object.hasOwnProperty(property);
});

/**
 * Recursively brings arrays to the highest level
 *
 * @function flatten
 *
 * @param {Array.<Array>} array - container of the set
 *
 * @return Array
 */
function flatten(array) {
  var isArray;
  var toArray$$1;
  var fromArray;

  isArray = function isArray(it) {
    return it.constructor === Array;
  };
  toArray$$1 = function toArray$$1(it) {
    return isArray(it) ? it : [it];
  };
  fromArray = function fromArray(a, b) {
    return a.concat(b);
  };

  while (array.some(isArray)) {
    array = array.map(toArray$$1).reduce(fromArray);
  }

  return array;
}

/**
 * Compares reference object to another object
 *
 * @function equals
 *
 * @see has
 * @see pair
 *
 * @param {Object} reference - what should be compared to
 * @param {Object} object - what we are comparing
 *
 * @return {boolean}
 */
function equals(reference, object) {
  // Are they of the same type?
  if ((typeof reference === 'undefined' ? 'undefined' : _typeof(reference)) !== (typeof object === 'undefined' ? 'undefined' : _typeof(object)) || reference.constructor !== object.constructor) {
    return false;
  }

  // Do we need to check recursively?
  if (reference.constructor !== Object) {
    return reference === object;
  }

  return flatten([pair(reference), pair(object)]).every(function (item) {
    return;
    has(reference)(item.key) && has(object)(item.key) && equals(reference[item.key], object[item.key]);
  });
}
/**
 * Checks to see if an item exists (isn't null or undefined)
 * @function exists
 *
 * @param {Object} it - the item in question of existance
 *
 * @return {boolean}
 */
function exists(it) {
  return it !== undefined && it !== null;
}

/**
 * Attempts to apply mutation to subject, but returns the unmodified subject on failure
 *
 * @function attempt
 *
 * @see array$
 *
 * @param {Function} mutation - mutator function to be called on the subject
 * @param {Object} subject - any input that should be mutated
 *
 * @return {Object}
 */
function attempt(mutation, subject) {
  var parameters;
  var alternative;
  var response;

  parameters = array$(arguments).slice(1);
  alternative = parameters.length === 1 ? parameters[0] : parameters;

  response = mutation.apply(this, parameters);

  return response || alternative;
}

/**
 * Injects a transformer into each element of a collection
 *
 * @name inject(it, transformer)
 *
 * @see attempt
 *
 * @param {Object} it - collection
 * @param {Function} tranform - mutator function
 *
 * @return {Object.<string, Function>}
 */
function inject(it, transform) {
  var copy = {};

  function cycle(key, value) {
    if (value === copy) {
      return false;
    }

    if (typeof value === 'function') {
      return attempt(transform, value);
    }

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      return inject(value, transform);
    }

    // return value;
  }

  for (var key in it) {
    copy[key] = cycle(key, it[key]);
  }

  return copy;
}

/**
 * Prepares a collection of functions for shipping by currying and adding a not chain
 *
 * @name prepare(it)
 *
 * @see inject
 * @see negated$
 * @see curry$
 *
 * @param {Object.<string, Function>} it - collection of functions
 *
 * @return {Object.<string, Function>} - returns curried functions with an additional 'not' chain
 */
function prepare(it) {
  var not, tmp;

  not = inject(it, negated$);
  not = inject(not, curry$);
  tmp = inject(it, curry$);

  tmp.not = not;

  return tmp;
}

/**
 * Applies functions to a value and moves down the chain if possible
 *
 * @function decompose
 *
 * @see exists
 * @see attempt
 * @see array$
 *
 * @param {Array} array - list of functions to be applied
 * @param {Object} initial - optional initial item
 *
 * @return Object
 */
function decompose(array, initial) {
  var composer = function composer(previous, current) {
    return attempt(current, previous);
  };
  var reducer = function reducer(it) {
    return array.reduce(composer, initial || it);
  };

  return initial ? reducer(initial) : reducer;
}

var is$ = {
  element: function element(object) {
    // return object instanceof Element;
    return object.nodeType === document.ELEMENT_NODE;
  },

  fragment: function fragment(object) {
    // return object.constructor === DocumentFragment;
    return object.nodeType === document.DOCUMENT_FRAGMENT_NODE;
  },

  text: function text(object) {
    // return child.constructor === Text;
    return object.nodeType === document.TEXT_NODE;
  },

  equal: equals,
  existant: exists
};

is$ = prepare(is$);

var is = is$;
var as = {
  array: array$,
  pair: pair,
  method: curry$,
  flatten: flatten,
  decomposed: decompose,
  attempt: attempt
};
//
// console.log(is$.not.equal({a: 'b'}, {a: 'b', c: 'd'}));

// transmutating elements =)

var Alchemist = function () {
	function Alchemist(element) {
		classCallCheck(this, Alchemist);

		this.setElement(element);
	}

	createClass(Alchemist, [{
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
		key: 'fromQuerySelector',
		value: function fromQuerySelector(element) {
			// find specified element
			if (typeof element === 'string') {
				return document.querySelector(element);
			}
		}
	}, {
		key: 'fromSizzle',
		value: function fromSizzle(element) {
			// it's a jQuery node
			// if (typeof jQuery !== 'undefined' && element.constructor === jQuery) {
			if (typeof element.get === 'function') {
				return element.get(0);
			}
			// }
		}
	}, {
		key: 'fromTemplate',
		value: function fromTemplate(element) {
			// html5 template content

			if (is.element(element)) {
				return element.content;
			}
		}
	}, {
		key: 'fromFragment',
		value: function fromFragment(element) {
			// defragment
			if (is.fragment(element) && element.hasChildNodes()) {
				return element.firstElementChild;
			}
		}
	}, {
		key: 'asElement',
		value: function asElement(element) {
			var waterfall = [Alchemist.fromQuerySelector, Alchemist.fromSizzle,
			// Alchemist.fromTemplate,
			Alchemist.fromFragment];

			var result = as.decomposed(waterfall, element);

			// element is already provided
			if (result && is.element(result)) {
				return result;
			}
		}
	}]);
	return Alchemist;
}();

// leeches off of the information...
var Parasite = function () {
	function Parasite(mutator) {
		classCallCheck(this, Parasite);

		this.setMutator(mutator);
	}

	createClass(Parasite, [{
		key: 'getChildren',
		value: function getChildren(element) {
			// Extternal helpers::as.array

			if (typeof element.content !== 'undefined') {
				element = element.content;
			}

			return as.array(element.childNodes);
		}
	}, {
		key: 'allChildren',
		value: function allChildren(element) {
			// External helpers::is.element helpers::as.flatten
			// Dependencies: getChildren

			var map = function (child) {
				return !is.element(child) ? child : this.allChildren(child);
			}.bind(this);

			var children = this.getChildren(element).map(map);

			return as.flatten(children);
		}
	}, {
		key: 'getAttributes',
		value: function getAttributes(element) {
			// External helpers::as.array

			return as.array(element.attributes);
		}
	}, {
		key: 'setChildren',
		value: function setChildren(element) {
			// External: helpers::is.element helpers::is.existant

			var attributes = this.setAttributes(element);
			var children = this.getChildren(element);

			for (var key in children) {
				var child = children[key];
				var result;

				if (is.text(child)) {
					if (child.textContent.trim().length > 0) {
						result = this.mutator.apply(child, [child.textContent, arguments[1], children]);
					}
				}

				if (is.element(child)) {
					this.setChildren(child);
				}

				if (is.existant(result)) {
					child.textContent = result;
				}
			}

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
				var result;
				var name;
				var value;

				name = attribute.name;
				value = attribute.value;

				if (element.hasAttribute(name) && value.trim().length > 0) {
					result = this.mutator.apply(element, [attribute.value, attribute.name, attributes]);
				}

				if (is.existant(result)) {
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

			var infection;
			var children;
			var sibilings;

			children = this.getChildren(this.infection);
			sibilings = this.getChildren(element);

			var _loop = function _loop(index) {
				var child = children[index];
				sibilings.every(function (it) {
					return is.not.equal(child, it);
				}) && element.appendChild(child);
			};

			for (var index in children) {
				_loop(index);
			}

			return element;
		}
	}, {
		key: 'setMutator',
		value: function setMutator(mutator) {
			this.mutator = mutator;
		}
	}]);
	return Parasite;
}();

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
		classCallCheck(this, nano);

		this.rendered = [];

		this.setTemplate(element);
	}

	createClass(nano, [{
		key: 'setTemplate',
		value: function setTemplate(it) {
			var element;

			element = Alchemist.asElement(it);
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
			var template;
			var cloned;
			var parasite;
			var element;
			var packet;

			template = this.getTemplate();
			cloned = template.cloneNode(true);
			parasite = new Parasite(genetics(object));

			element = parasite.infect(cloned);

			packet = {
				object: object,
				element: element,
				parasite: parasite
			};

			this.rendered.push(packet);

			return element;
		}
	}, {
		key: 'setOutput',
		value: function setOutput(it) {
			var element;
			var that;

			element = Alchemist.asElement(it);

			while (that = this.rendered.shift()) {
				that.parasite.addChildren(element);
			}
		}
	}]);
	return nano;
}();

return nano;

})));
//# sourceMappingURL=nano.js.map
