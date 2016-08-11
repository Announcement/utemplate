import { version } from '../package.json';
import Alchemist from './alchemist.js';
import Parasite from './parasite.js';
import Nudist from './nudist.js';

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
		return query(data, property);
	};

	value = value.trim();
	value = value.replace(regexp, replacement);
	console.log(value);
	return value;
};

let encoder = (data) => {
	return btoa(function() {
		var $ref = {};

		for (var key in data) {
			if (data.hasOwnProperty((key))) {
				$ref[key] = escape(data[key]);
			}
		}

		return JSON.stringify($ref);
	}());
}

// what we're actually dealing with.
export default class Template {
	constructor(element) {
		this.pipeline = [];
		this.mutators = [];

		this.sources = [];
		this.outputs = [];

		this.setElement(element);
	}

	get version() {
		return version;
	}

	getElement(element) {
		if (typeof Alchemist !== 'undefined') {
      element = Alchemist.asElement(element);
    }

		return element;
	}

	setElement(element) {
		element = this.getElement(element);

    this.element = element;

		return element;
	}

	fromEventSource(source) {
		// on 'data', <pipe>
	}

	fromPromise(action) {
		// then <pipe>
	}

	fromEvent(action) {
		// addEventListener 'click', <pipe>
	}

	fromData(data) {
		var tracker;

		tracker = {};
		tracker.source = source;
		tracker.passed = [];

		this.sources.push(tracker);

		return tracker;
	}

	fromHandler(handler) {
		// <pipe> addEventListener, 'click'
	}

	fromMutator(mutator) {
		// element level transformations
	}

	fromElement(element) {
		this.outputs.push(element);
	}

	route(connection) {
		this.pipeline.push(connection);
	}

	render() {
		let parser = ((previous, current) => {
			if (previous.passed.indexOf(current) !== -1) {
				return previous;
			}

			let response = current.call(previous, previous.source);

			previous.passed.push(current);

			if (response !== undefined && response !== null) {
				previous.source = response;
			}

			return previous;
		}).bind(this);

		for (let source of this.sources) {
			let cloned = this.element.cloneNode(true);
			let parsed = this.pipeline.reduce(parser, source);
			let genetics = ((input) => {
				return compile(input, parsed.source);
			});

			let parasite = new Parasite(genetics);
			let template = parasite.infect(cloned);

			// reduce across mutators

			template.rendered = encoder(parsed.source);

			for (let output of this.outputs) {
				var rendered;
				for (let child of output.childNodes) {
					if (child.rendered === template.rendered) {
						rendered = output.replaceChild(template, child);
					}
				}
				if (rendered === undefined) {
					output.appendChild(template);
				}
			}
		}
	}

	pipe(flow) {
		if (flow.constructor === Object) {
			this.fromData(flow);
		} else if (flow instanceof Element) {
			this.fromElement(flow);
		} else if (flow instanceof String) {
			this.fromElement(this.getElement(flow));
		} else {
			this.route.apply(this, arguments);
		}

		this.render();

		return this;
	}
}
