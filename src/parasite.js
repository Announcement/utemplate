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
				var name;
				var value;

				name = attribute.name;
				value = attribute.value;

				if (element.hasAttribute(name) && value.trim().length > 0) {
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
