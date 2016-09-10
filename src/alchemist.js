import {is, as} from './helpers'

// transmutating elements =)
export default class Alchemist {
	constructor(element) {
		this.setElement(element);
	}

	static fromQuerySelector(element) {
		// find specified element
		if (typeof element === 'string') {
			return document.querySelector(element);
		}
	}

	static fromSizzle(element) {
		// it's a jQuery node
		// if (typeof jQuery !== 'undefined' && element.constructor === jQuery) {
		if (typeof element.get === 'function') {
			return element.get(0);
		}
		// }
	}

	static fromTemplate(element) {
		// html5 template content

		if (is.element(element)) {
			return element.content;
		}
	}

	static fromFragment(element) {
		// defragment
		if (is.fragment(element) && element.hasChildNodes()) {
			return element.firstElementChild;
		}
	}

	static asElement(element) {
		let waterfall = [
				Alchemist.fromQuerySelector,
				Alchemist.fromSizzle,
				// Alchemist.fromTemplate,
				Alchemist.fromFragment
		];

		let result = as.decomposed(waterfall, element);

		// element is already provided
		if (result && is.element(result)) {
			return result;
		}
	}

	setElement(element) {
		this.element = Alchemist.asElement(element);
		return this;
	}

	getElement() {
		return this.element;
	}
}
