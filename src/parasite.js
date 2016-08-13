// leeches off of the information...

function not(a) {
	return function() {
		return !a.apply(this, arguments);
	}
}

function equal(a) {
	return function(b) {
		return a === b;
	}
}

function asArray(object) {
	return Array.prototype.slice.call(object, 0);
}


export default class Parasite {
	constructor(mutator) {
		this.setMutator(mutator);
	}

	getChildren(element) {
		if (typeof element.content !== 'undefined') {
			element = element.content;
		}

		return asArray(element.childNodes);
	}

	allChildren(element) {
		var children;

		children = this.getChildren(element);

		for (let child of children) {
			if (child instanceof Element) {
				children = children.concat(allChildren(child));
			} else {
				children.push(child);
			}
		}

		return children;
	}

	getAttributes(element) {
		return asArray(element.attributes);
	}

	setChildren(element) {
		let attributes = this.setAttributes(element);
		let children = this.getChildren(element);

		for (let child of children) {
			var result;

			if (child.constructor === Text) {
				if (child.textContent.trim().length > 0) {
					result = this.mutator.apply(child, [
						child.textContent,
						arguments[1],
						children
					]);
				}
			}

			if (child instanceof Element) {
				this.setChildren(child);
			}

			if (result !== undefined && result !== null) {
				child.textContent = result;
			}
		};

		return element;
	}

	setAttributes(element) {
		let attributes = this.getAttributes(element);

		for (let attribute of attributes) {
			var result;
			var name;
			var value;

			name = attribute.name;
			value = attribute.value;

			if (element.hasAttribute(name) && value.trim().length > 0) {
				result = this.mutator.apply(element, [
					attribute.value,
					attribute.name,
					attributes
				]);
			}

			if (result !== undefined && result !== null) {
				element.setAttribute(attribute.name, result);
			}
		}

		return attributes;
	}

	infect(element) {
		element = this.setChildren(element);

		this.infection = element;

		return element;
	}

	addChildren(element) {
		var infection;
		var children;

		children = this.getChildren(this.infection);

		for (let child of children) {
			if (!this.getChildren(element).some(equal(child))) {
				element.appendChild(child);
			}
		}

		return element;
	}

	setMutator(mutator) {
		this.mutator = mutator;
	}
}
