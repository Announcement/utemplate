import { version } from '../package.json';
import Alchemist from './alchemist.js';
import Parasite from './parasite.js';
import Nudist from './nudist.js';

// what we're actually dealing with.
export default class Template {
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

	getEventSource(source) {

	}
	getEvent(action) {

	}
	getData(data) {

	}
	getHandler(handler) {

	}
	getMutator(mutator) {

	}
	route(connection) {

	}
	render(renderer) {

	}
	pipe(flow) {
		// the 'good' stuff
	}
}
