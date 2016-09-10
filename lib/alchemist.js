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

			if (_helpers.is.element(element)) {
				return element.content;
			}
		}
	}, {
		key: 'fromFragment',
		value: function fromFragment(element) {
			// defragment
			if (_helpers.is.fragment(element) && element.hasChildNodes()) {
				return element.firstElementChild;
			}
		}
	}, {
		key: 'asElement',
		value: function asElement(element) {
			var waterfall = [Alchemist.fromQuerySelector, Alchemist.fromSizzle,
			// Alchemist.fromTemplate,
			Alchemist.fromFragment];

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