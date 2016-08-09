// transmutating elements =)
export default class Alchemist {
	static asElement(element) {
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
