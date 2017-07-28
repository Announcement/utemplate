'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  var regexp;
  var replacement;

  regexp = /\{([^}]+)\}/g;
  replacement = function replacement(original, property) {
    return query(data, property) || '';
  };

  return value.trim().replace(regexp, replacement);
};

exports.query = query;
exports.compile = compile;