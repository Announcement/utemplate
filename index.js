(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Template = factory());
}(this, function () { 'use strict';

  var version = "2.1.3";

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
  		value: function asElement(element) {
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
  			var attributes = this.setAttributes(element);
  			var children = this.getChildren(element);

  			var _iteratorNormalCompletion = true;
  			var _didIteratorError = false;
  			var _iteratorError = undefined;

  			try {
  				for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
  					var child = _step.value;

  					var result;

  					if (child.nodeType === document.TEXT_NODE) {
  						if (child.textContent.trim().length > 0) {
  							result = this.mutator.apply(child, [child.textContent, arguments[1], children]);
  						}
  					}

  					if (child.nodeType === document.ELEMENT_NODE) {
  						this.setChildren(child);
  					}

  					if (result !== undefined && result !== null) {
  						child.textContent = result;
  					}
  				}
  			} catch (err) {
  				_didIteratorError = true;
  				_iteratorError = err;
  			} finally {
  				try {
  					if (!_iteratorNormalCompletion && _iterator.return) {
  						_iterator.return();
  					}
  				} finally {
  					if (_didIteratorError) {
  						throw _iteratorError;
  					}
  				}
  			}

  			;

  			return element;
  		}
  	}, {
  		key: "setAttributes",
  		value: function setAttributes(element) {
  			var attributes = this.getAttributes(element);

  			var _iteratorNormalCompletion2 = true;
  			var _didIteratorError2 = false;
  			var _iteratorError2 = undefined;

  			try {
  				for (var _iterator2 = attributes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
  					var attribute = _step2.value;

  					var result;
  					var name;
  					var value;

  					name = attribute.name;
  					value = attribute.value;

  					if (element.hasAttribute(name) && value.trim().length > 0) {
  						result = this.mutator.apply(element, [attribute.value, attribute.name, attributes]);
  					}

  					if (result !== undefined && result !== null) {
  						element.setAttribute(attribute.name, result);
  					}
  				}
  			} catch (err) {
  				_didIteratorError2 = true;
  				_iteratorError2 = err;
  			} finally {
  				try {
  					if (!_iteratorNormalCompletion2 && _iterator2.return) {
  						_iterator2.return();
  					}
  				} finally {
  					if (_didIteratorError2) {
  						throw _iteratorError2;
  					}
  				}
  			}

  			return attributes;
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
  		return query(data, property);
  	};

  	value = value.trim();
  	value = value.replace(regexp, replacement);
  	console.log(value);
  	return value;
  };

  var encoder = function encoder(data) {
  	return btoa(function () {
  		var $ref = {};

  		for (var key in data) {
  			if (data.hasOwnProperty(key)) {
  				$ref[key] = escape(data[key]);
  			}
  		}

  		return JSON.stringify($ref);
  	}());
  };

  // what we're actually dealing with.

  var Template = function () {
  	function Template(element) {
  		classCallCheck(this, Template);

  		this.pipeline = [];
  		this.mutators = [];

  		this.sources = [];
  		this.outputs = [];

  		this.setElement(element);
  	}

  	createClass(Template, [{
  		key: 'getElement',
  		value: function getElement(element) {
  			if (typeof Alchemist !== 'undefined') {
  				element = Alchemist.asElement(element);
  			}

  			return element;
  		}
  	}, {
  		key: 'setElement',
  		value: function setElement(element) {
  			element = this.getElement(element);

  			this.element = element;

  			return element;
  		}
  	}, {
  		key: 'fromEventSource',
  		value: function fromEventSource(source) {
  			// on 'data', <pipe>
  		}
  	}, {
  		key: 'fromPromise',
  		value: function fromPromise(action) {
  			// then <pipe>
  		}
  	}, {
  		key: 'fromEvent',
  		value: function fromEvent(action) {
  			// addEventListener 'click', <pipe>
  		}
  	}, {
  		key: 'fromData',
  		value: function fromData(data) {
  			var tracker;

  			tracker = {};
  			tracker.source = source;
  			tracker.passed = [];

  			this.sources.push(tracker);

  			return tracker;
  		}
  	}, {
  		key: 'fromHandler',
  		value: function fromHandler(handler) {
  			// <pipe> addEventListener, 'click'
  		}
  	}, {
  		key: 'fromMutator',
  		value: function fromMutator(mutator) {
  			// element level transformations
  		}
  	}, {
  		key: 'fromElement',
  		value: function fromElement(element) {
  			this.outputs.push(element);
  		}
  	}, {
  		key: 'route',
  		value: function route(connection) {
  			this.pipeline.push(connection);
  		}
  	}, {
  		key: 'render',
  		value: function render() {
  			var _this = this;

  			var parser = function (previous, current) {
  				if (previous.passed.indexOf(current) !== -1) {
  					return previous;
  				}

  				var response = current.call(previous, previous.source);

  				previous.passed.push(current);

  				if (response !== undefined && response !== null) {
  					previous.source = response;
  				}

  				return previous;
  			}.bind(this);

  			var _iteratorNormalCompletion = true;
  			var _didIteratorError = false;
  			var _iteratorError = undefined;

  			try {
  				var _loop = function _loop() {
  					var source = _step.value;

  					var cloned = _this.element.cloneNode(true);
  					var parsed = _this.pipeline.reduce(parser, source);
  					var genetics = function genetics(input) {
  						return compile(input, parsed.source);
  					};

  					var parasite = new Parasite(genetics);
  					var template = parasite.infect(cloned);

  					// reduce across mutators

  					template.rendered = encoder(parsed.source);

  					var _iteratorNormalCompletion2 = true;
  					var _didIteratorError2 = false;
  					var _iteratorError2 = undefined;

  					try {
  						for (var _iterator2 = _this.outputs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
  							var output = _step2.value;
  							var _iteratorNormalCompletion3 = true;
  							var _didIteratorError3 = false;
  							var _iteratorError3 = undefined;

  							try {
  								for (var _iterator3 = output.childNodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
  									var child = _step3.value;

  									if (child.rendered === template.rendered) {
  										rendered = output.replaceChild(template, child);
  									}
  								}
  							} catch (err) {
  								_didIteratorError3 = true;
  								_iteratorError3 = err;
  							} finally {
  								try {
  									if (!_iteratorNormalCompletion3 && _iterator3.return) {
  										_iterator3.return();
  									}
  								} finally {
  									if (_didIteratorError3) {
  										throw _iteratorError3;
  									}
  								}
  							}

  							if (rendered === undefined) {
  								output.appendChild(template);
  							}
  						}
  					} catch (err) {
  						_didIteratorError2 = true;
  						_iteratorError2 = err;
  					} finally {
  						try {
  							if (!_iteratorNormalCompletion2 && _iterator2.return) {
  								_iterator2.return();
  							}
  						} finally {
  							if (_didIteratorError2) {
  								throw _iteratorError2;
  							}
  						}
  					}
  				};

  				for (var _iterator = this.sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
  					var rendered;

  					_loop();
  				}
  			} catch (err) {
  				_didIteratorError = true;
  				_iteratorError = err;
  			} finally {
  				try {
  					if (!_iteratorNormalCompletion && _iterator.return) {
  						_iterator.return();
  					}
  				} finally {
  					if (_didIteratorError) {
  						throw _iteratorError;
  					}
  				}
  			}
  		}
  	}, {
  		key: 'pipe',
  		value: function pipe(flow) {
  			if (flow.constructor === Object) {
  				this.fromData(flow);
  			} else if (flow instanceof Element) {
  				this.fromElement(flow);
  			} else if (flow instanceof String) {
  				this.fromElement(this.getElement(flow));
  			} else {
  				this.route.apply(this, arguments);
  			}

  			this.render();

  			return this;
  		}
  	}, {
  		key: 'version',
  		get: function get() {
  			return version;
  		}
  	}]);
  	return Template;
  }();

  new Nudist(Parasite);
  new Nudist(Alchemist);

  return Template;

}));