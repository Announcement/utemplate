// transmutating elements =)
export default class Alchemist {
	static fromQuerySelector(element) {
		// find specified element
		if (element.constructor === String) {
			return document.querySelector(element) || element;
		}

		return element;
	}

	static fromSizzle(element) {
		// it's a jQuery node
		if (typeof jQuery !== 'undefined' && element.constructor === jQuery) {
			return element.get(0) || element;
		}

		return element;
	}

	static fromTemplate(element) {
		// html5 template content
		if (element instanceof Element && element.tagName === 'TEMPLATE') {
			return element.content || element;
		}

		return element;
	}

	static fromFragment(element) {
		// defragment
		if (element instanceof DocumentFragment && element.hasChildNodes()) {
			return element.firstElementChild || element;
		}

		return element;
	}

	static asElement(element) {
		element = ([
			Alchemist.fromQuerySelector,
			Alchemist.fromSizzle,
			// Alchemist.fromTemplate,
			Alchemist.fromFragment
		]).reduce((previous, current) => {
			return current(previous) || previous;
		}, element);

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
