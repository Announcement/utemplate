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

var version = "0.3.0";

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

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

/**
  * @version 1
  */

var Template = function () {
  createClass(Template, null, [{
    key: 'version',
    get: function get() {
      return version;
    }
  }]);

  function Template(it) {
    classCallCheck(this, Template);

    this.setSource(it);
    this.setDestination(it + 's');
  }

  /**
   * Set the source element for the template.
   * @method setSource
   *
   * @param {String} it - The querySelector for source element.
   */


  createClass(Template, [{
    key: 'setSource',
    value: function setSource(it) {
      this.from = document.querySelector(it);
      this.source = this.from.innerHTML + '';
    }

    /**
     * Set the destination element for the template.
     * @method setDestination
     *
     * @param {String} it - The querySelector for the destination element.
     */

  }, {
    key: 'setDestination',
    value: function setDestination(it) {
      this.to = document.fromQuerySelector(it);
    }

    /**
     * Compile template data.
     * @method render
     *
     * @param {Object} it - Data to be compiled into template.
     *
     * @returns {String} Representing the compiled template.
     */

  }, {
    key: 'render',
    value: function render(it) {
      return compile(this.source, it);
    }

    /**
     * Render template data to destination.
     * @method generate
     *
     * @param {Object} it - Data to be passed to render.
     */

  }, {
    key: 'generate',
    value: function generate(it) {
      to.innerHTML += this.render(it);
    }
  }]);
  return Template;
}();

export default Template;
//# sourceMappingURL=index.js.map
