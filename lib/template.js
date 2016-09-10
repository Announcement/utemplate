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

// what we're actually dealing with.

var Template = function () {
	function Template(element) {
		_classCallCheck(this, Template);

		this.pipeline = [];
		this.mutators = [];

		this.sources = [];
		this.outputs = [];

		this.setElement(element);
	}

	_createClass(Template, [{
		key: 'getElement',
		value: function getElement(element) {
			if (typeof _alchemist2.default !== 'undefined') {
				element = _alchemist2.default.asElement(element);
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
			tracker.source = data;
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
		value: function route(flow) {
			var that;

			if (flow.constructor === Object) {
				return this.fromData(flow);
			}

			if (that = this.getElement(flow)) {
				return this.fromElement(that);
			}

			this.pipeline.push(flow);
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

			var mutationParser = function (previous, current) {
				var response = current(previous);

				if (response !== undefined && response !== null) {
					return response;
				}

				return previous;
			}.bind(this);

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				var _loop = function _loop() {
					var source = _step.value;

					var parsed = _this.pipeline.reduce(parser, source);
					var cloned = _this.element.cloneNode(true);

					var genetics = function genetics(input) {
						return compile(input, parsed.source);
					};

					var parasite = new _parasite2.default(genetics);

					if (parsed.compiled === undefined) {
						parasite.infect(cloned);
						parsed.compiled = parasite.infection;
					} else {
						parasite.infection = parsed.compiled;
					}

					// reduce across mutators

					_this.outputs.forEach(parasite.addChildren.bind(parasite));
				};

				for (var _iterator = this.sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
			this.route(flow);
			this.render();
			return this;
		}
	}], [{
		key: 'version',
		get: function get() {
			return _package.version;
		}
	}]);

	return Template;
}();

exports.default = Template;