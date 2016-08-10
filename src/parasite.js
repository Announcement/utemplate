// leeches off of the information...
export default class Parasite {
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
		let attributes = this.setAttributes(element);
		let children = this.getChildren(element);
		
		for (let child of children) {
			var result;

			if (child.nodeType === document.TEXT_NODE) {
				if (child.textContent.trim().length > 0) {
					result = this.mutator.apply(child, [
						child.textContent,
						arguments[1],
						children
					]);
				}
			}

			if (child.nodeType === document.ELEMENT_NODE) {
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
		return this.setChildren(element);
	}

	setMutator(mutator) {
		this.mutator = mutator;
	}
}
