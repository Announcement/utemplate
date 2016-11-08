import { version } from '../package.json';
import Alchemist from './alchemist';
import Parasite from './parasite';
import {is, as} from './helpers';
//getDatBooty6
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

export default class Milli {

  constructor(source) {
    this.source = Alchemist.asElement(source);
    this.methods = [];
    this.sources = [];
  }

  static get version() {
    return version;
  }

  setMutations(source) {
    var methods;

    methods = this.methods;
  }

  setSources(method) {
    var sources;

    sources = this.sources.map(method);

    this.sources = sources;
  }

  setContent() {
    var output;

    output = this.output;

    if (is.not.existant(output)) {
      return false;
    }

    this.setSources(source => {
      if (is.existant(source.children)) {
        return source;
      }

      var parasite;
      var compiled;
      var children;

      parasite = source.parasite;
      compiled = source.compiled;

      children = parasite.addChildren(output);
      source.children = children;

      return source;
    });
  }

  getContent() {
    var template;
    var methods;

    template = this.source;
    methods = this.methods;

    let isInfected = it => {
      var content;

      content = it.parsed || it.content;

      if (is.not.existant(it.parasite)) {
        it.parasite = new Parasite(genetics(content));
      }

      return it.parasite;
    };

    let isCompiled = it => {
      if (is.not.existant(it.compiled)) {
        let cloned = template.cloneNode(true);
        let element = it.parasite.infect(cloned);
      }

      return it.compiled;
    };

    let eachMutation = it => {
      var result;

      result = methods.reduce(function(previous, current, index) {
        let rendered = current(previous);

        it.mutations[index] = rendered;

        return rendered || previous;
      }, it.content);

      it.parsed = result;

      return result;
    };

    let isMutation = it =>
      if (is.not.existant(it.mutations)) {
        it.mutations = [];
      }

      if (it.mutations.length < methods.length) {
        eachMutation(it);
      }

      return it.mutations;
    };

    this.setSources(source => {
      let mutation = isMutation(source);
      let infected = isInfected(source);
      let compiled = isCompiled(source);

      return source;
    });
  }

  setDestination(it) {
    var element;

    element = Alchemist.asElement(it);

    if (is.not.existant(element)) {
      return false;
    }

    this.output = element;

    if (this.sources.length > 0) {
      this.setContent();
    }

    return element;
  }

  fromObject(it) {
    var packet;

    packet = {};

    if (it.constructor !== Object) {
      return false;
    }

    packet.content = it;

    this.sources.push(packet);

    this.getContent();
    this.setContent();

    return it;
  }

  fromMethod(it) {
    if (it.constructor !== Function) {
      return false;
    }

    this.getContent();
    this.methods.push(it);

    return it;
  }

  pipe(object) {
    var waterfall;
    var result;

    waterfall = [
      this.setDestination,
      this.fromObject,
      this.fromMethod
    ];

    waterfall.some(method => result = method.call(this, object));

    return this;
  }
}
