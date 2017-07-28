'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = function () {
  function Cache() {
    _classCallCheck(this, Cache);

    this.cells = [];
  }

  _createClass(Cache, [{
    key: 'updates',
    value: function updates(list) {
      var cells = this.cells;
      var original = list.filter(Cache.exclude(cells));

      return original;
    }
  }], [{
    key: 'safe',
    value: function safe(item) {
      if (typeof item === 'function') {
        return item.name;
      }
      return item;
    }
  }, {
    key: 'multiply',
    value: function multiply(rows, columns) {
      var cells = [];
      var total = rows.length * columns.length;

      for (var i = 0; i < total; i++) {
        var x = i % columns.length;
        var y = Math.floor(i / columns.length);

        var column = columns[x];
        var row = rows[y];

        cells.push({ column: column, row: row });
      }

      return cells;
    }
  }, {
    key: 'exclude',
    value: function exclude(list) {
      return function (item) {
        return list.indexOf(item) === -1;
      };
    }
  }]);

  return Cache;
}();

exports.default = Cache;