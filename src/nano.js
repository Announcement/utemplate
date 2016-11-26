import Alchemist from './alchemist';
import Parasite from './parasite';
import {is} from './helpers';

let query = (object, property) => {
	let regexp = /[.{}]/g;
	let filter = (source) => { return source; };
	let reduce = (source, key) => { return source[key]; };

	return property
	.split(regexp)
	.filter(filter)
	.reduce(reduce, object);
};

let compile = (value, data) => {
	let regexp = /\{([^}]+)\}/g;

	let replacement = (original, property) => {
		return query(data, property) || '';
	};

	return value
	.trim()
	.replace(regexp, replacement);
};

let genetics = function(source) {
	return input => compile(input, source);
};

export default class nano {
	constructor(element) {
		this.rendered = [];

		this.setTemplate(element);
	}

	setTemplate(it) {
		var element;

		element = Alchemist.asElement(it);
		this.template = element;

		return element;
	}

	getTemplate() {
		return this.template;
	}

	fromObject(object) {
		var template;
		var cloned;
		var parasite;
		var element;
		var packet;

		template = this.getTemplate();
		cloned = template.cloneNode(true);
		parasite = new Parasite(genetics(object));

		element = parasite.infect(cloned);

		packet = {
			'object': object,
			'element': element,
			'parasite': parasite
		};

		this.rendered.push(packet);

		return element;
	}

	setOutput(it) {
		var element;
		var that;

		element = Alchemist.asElement(it);

		let append = it => it.parasite.addChildren(element);
		let getNext = it => this.rendered.shift();

		while (this.rendered.length) {
			setContent(getValue());
		}
	}

}
