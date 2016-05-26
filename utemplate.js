var Template;

Template = (function(element) {
    var prototype;
    var constructor;

    constructor = Template;
    prototype = Template.prototype;

    constructor.className = "Template";

    prototype.setElement = function(element) {
        element = element.content.firstElementChild;

        this.element = element;

        return element;
    };

    prototype.prepare = function(data) {
        var element, html, mods;

        element = this.element.cloneNode();

        html = element.innerHTML;

        mods = {
            time: {
                iso: function() {
                    return (new Date()).toISOString();
                }
            }
        };

        html = html.replace(/\{([^}]+)\}/g, function() {
            var original, capture;

            original = arguments[0];
            capture = arguments[1];

            if (capture.indexOf(":") !== -1) {
                    var mod, func;

                    mod = capture.split(":");
                    func = mod.pop();
                    mod = mod.shift();

                    if (mods[mod] && mods[mod][func]) {
                        return mods[mod][func](capture);
                    }
            } else if (data.hasOwnProperty(capture)) {
                return data[capture];

            }
            return original;
        });

        element.innerHTML = html;

        return element;
    };

    function Template(element) {
        this.setElement(element);
    }

    return Template;
}());

module.exports = Template;
