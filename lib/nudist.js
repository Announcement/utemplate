'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// expert on exposure ;)
var Nudist = function () {
	_createClass(Nudist, null, [{
		key: 'expose',
		value: function expose(input) {
			if (typeof define === 'function') {
				define(input);
			}

			[window, global].filter(function (it) {
				return it;
			}).forEach(function (it) {
				it[input.name] = input;
			});
		}
	}]);

	function Nudist(program) {
		_classCallCheck(this, Nudist);

		Nudist.expose(program);
	}

	return Nudist;
}();

exports.default = Nudist;