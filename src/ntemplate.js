// expert on exposure ;)
class Nudist {
	static expose(input) {
		if (typeof define === 'function') {
      define(input.name.toLowerCase(), [], function () { return input; } );
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
	constructor(program) {
		Nudist.expose(program);
	}
}

// transmutating elements =)
class Alchemist {
	static asElement() {
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
	setElement(element) {
		this.element = Alchemist.asElement(element);
	}
	getElement() {
		return this.element;
	}
	constructor(element) {
		this.setElement(element);
	}
}

// leeches off of the information...
class Parasite {
	constructor(mutator) {
		this.setMutator(mutator);
	}

	getChildren(element) {
		return ([]).slice.call(element.childNodes, 0);
	}

	getAttributes(element) {
		return ([]).slice.call(element.attributes, 0);
	}

	setChildren(element) {
		var mutator;
		var setChildren;
		var setAttributes;
		var children;

		mutator = this.mutator;
		setChildren = this.setChildren.bind(this);

		this.setAttributes(element)
		children = this.getChildren(element);

		children.forEach((child) => {
			var result;

			if (child.nodeType === document.TEXT_NODE &&
					child.textContent.trim().length > 0) {
				result = mutator.apply(child, [
					child.textContent,
					arguments[1],
					children
				]);
			}

			if (child.nodeType === document.ELEMENT_NODE) {
				setChildren(child);
			}

			if (result !== undefined && result !== null) {
				child.textContent = result;
			}
		});
	}

	setAttributes(element) {
		var mutator;
		var attributes;

		mutator = this.mutator;
		attributes = this.getAttributes(element);

		attributes.forEach((attribute) => {
			var result;

			if (element.hasAttribute(attribute.name) &&
					attribute.value.trim().length > 0) {
				result = mutator.apply(element, [
					attribute.value,
					attribute.name,
					attributes
				]);
			}

			if (result !== undefined && result !== null) {
				element.setAttribute(attribute.name, result);
			}
		});
	}

	infect(element) {
		return this.setChildren(element);
	}

	setMutator(mutator) {
		this.mutator = mutator;
	}
}

// what we're actually dealing with.
class Template {
	constructor(element) {
		this.pipeline = [];
		this.sources = [];

		this.alchemist = new Alchemist();

		this.setElement(element);
	}

	setElement(element) {
		if (typeof Alchemist !== 'undefined') {
      element = Alchemist.asElement(element);
    }

    this.element = element;

		return element;
	}

	pipe(flow) {
		// the 'good' stuff
	}
}
