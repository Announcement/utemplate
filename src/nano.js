import Alchemist from './alchemist';
import Parasite from './parasite';

let query = (object, property) => {
  let regexp = /[.{}]/g;
  let filter = (source) => {
 return source;
};
  let reduce = (source, key) => {
 return source[key];
};

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
  return (input) => compile(input, source);
};

export default class nano {
  constructor(element) {
    this.rendered = [];

    this.setTemplate(element);
  }

  setTemplate(it) {
    let element;

    element = Alchemist.asElement(it);
    this.template = element;

    return element;
  }

  getTemplate() {
    return this.template;
  }

  fromObject(object) {
    let template;
    let cloned;
    let parasite;
    let element;
    let packet;

    template = this.getTemplate();
    cloned = template.cloneNode(true);
    parasite = new Parasite(genetics(object));

    element = parasite.infect(cloned);

    packet = {
      'object': object,
      'element': element,
      'parasite': parasite,
    };

    this.rendered.push(packet);

    return element;
  }

  setOutput(it) {
    let element;

    element = Alchemist.asElement(it);

    let isEmpty = (it) => this.rendered.length === 0;
    let addChildren = (it) => it.parasite.addChildren(element);
    let fromRendered = (it) => this.rendered.shift();

    while (!isEmpty()) {
      addChildren(fromRendered());
    }
  }

}
