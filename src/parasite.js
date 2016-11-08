// leeches off of the information...
import {is, as} from './helpers'

export default class Parasite {
	constructor(mutator) {
		this.setMutator(mutator);
	}

	getChildren(element) {
		// Extternal helpers::as.array

		if (typeof element.content !== 'undefined') {
			element = element.content;
		}

		return as.array(element.childNodes);
	}

	allChildren(element) {
		// External helpers::is.element helpers::as.flatten
		// Dependencies: getChildren

		let map = (function(child) {
			return (!is.element(child)) ? child : this.allChildren(child);
		}).bind(this);

		let children = this.getChildren(element).map(map);

		return as.flatten(children);
	}

	getAttributes(element) {
		// External helpers::as.array

		return as.array(element.attributes);
	}

	setChildren(element) {
		// External: helpers::is.element helpers::is.existant

		let attributes = this.setAttributes(element);
		let children = this.getChildren(element);

		for (let key in children) {
			let child = children[key];
			var result;

			if (is.text(child)) {
				if (child.textContent.trim().length > 0) {
					result = this.mutator.apply(child, [
						child.textContent,
						arguments[1],
						children
					]);
				}
			}

			if (is.element(child)) {
				this.setChildren(child);
			}

			if (is.existant(result)) {
				child.textContent = result;
			}
		};

		return element;
	}

	setAttributes(element) {
		// External: helpers::is.existant
		// Dependencies: getAttributes

		let attributes = this.getAttributes(element);

		for (let index in attributes) {
			let attribute = attributes[index];
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

			if (is.existant(result)) {
				element.setAttribute(attribute.name, result);
			}
		}

		return attributes;
	}

	infect(element) {
		// Dependencies: setChildren

		element = this.setChildren(element);

		this.infection = element;

		return element;
	}

	addChildren(element) {
		// External: helpers::is.not.equal
		// Dependencies: getChildren

		var infection;
		var children;
		var sibilings;

		children = this.getChildren(this.infection);
		sibilings = this.getChildren(element);

		for (let index in children) {
			let child = children[index];
			sibilings.every(it => is.not.equal(child, it)) && element.appendChild(child);
		}

		return children;
	}

	setMutator(mutator) {
		this.mutator = mutator;
	}
}
