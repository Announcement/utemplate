var Template;

Template = (function(element) {
    var prototype;
    var constructor;

    constructor = Template;
    prototype = Template.prototype;

    constructor.className = "Template";

    function asElement(element) {

      // find specified element
      if (element.constructor === String) {
        element = document.querySelector(element);
      }

      // it's a jQuery node
      if (element.constructor.name === 'oe') {
        element = element.get(0);
      }

      if (element instanceof Element && element.tagName === 'TEMPLATE') {
        element = element.content;
      }

      if (element instanceof DocumentFragment) {
        element = element.firstElementChild;
      }

      // element is already provided
      if (element instanceof Element) {
        return element;
      } else {
        throw new Error("An invalid or unknown document element node specified.");
      }
    }

    function query(object, search) {
      return search
        .split(/[.{}]/g)
        .filter(function(e) { return e; })
        .reduce(function(a, b) { return a[b] }, o);
    }

    prototype.setElement = function(element) {
        element = asElement(element);

        this.element = element;

        return element;
    };

    prototype.configureAddons = function() {
      this.mods = this.mods || {};
      this.mods.time = this.mods.time || {};

      this.mods.time.iso = function() {
        return (new Date()).toISOString();
      };

      this.mods.time.locale = function() {
        return (new Date()).toLocaleString();
      };
    };

    prototype.prepare = function(data) {
        var element, html, properties;

        element = this.element.cloneNode(true);
        html = element.innerHTML;
        properties = /\{([^}]+)\}/g;

        Object.defineProperties(data, {
          query: {enumerable: false, value: query}
        });

        html = html.replace(properties, withValues);

        element.innerHTML = html;

        return element;

        function runAddon(capture) {
          var mod, func;

          mod = capture.split(":");
          func = mod.pop();
          mod = mod.shift();

          if (mods[mod] && mods[mod][func]) {
              return mods[mod][func].call(this, capture);
          }
        }

        function withValues(original, capture) {
          var module;
          var cache;

          if (capture.indexOf(":") !== -1) {
            module = runAddon.call(data, capture);

            if (module !== null && module !== undefined) {
              return module;
            }
          }

          return query(data, original) || original;
        }
    };

    function Template(element) {
      this.configureAddons();
      this.setElement(element);
    }

    return Template;
}());

if (window !== undefined) {
  window.Template = Template;
}

module.exports = Template;
