import {version} from '../package.json'
import Alchemist from './alchemist'
import Parasite from './parasite'

let query = (object, property) => {
  let regexp = /[.{}]/g
  let filter = (source) => source
  let reduce = (source, key) => source[key]

  return property
  .split(regexp)
  .filter(filter)
  .reduce(reduce, object)
}

let compile = (value, data) => {
  let regexp = /\{([^}]+)\}/g
  let replacement = (original, property) => {
    return query(data, property) || ''
  }

  return value
  .trim()
  .replace(regexp, replacement)
}

// what we're actually dealing with.
export default class Template {
  constructor(element) {
    this.pipeline = []
    this.mutators = []

    this.sources = []
    this.outputs = []

    this.setElement(element)
  }

  static get version() {
    return version
  }

  getElement(element) {
    if (typeof Alchemist !== 'undefined') {
      element = Alchemist.asElement(element)
    }

    return element
  }

  setElement(element) {
    element = this.getElement(element)

    this.element = element

    return element
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
    let tracker

    tracker = {}
    tracker.source = data
    tracker.passed = []

    this.sources.push(tracker)

    return tracker
  }

  fromHandler(handler) {
    // <pipe> addEventListener, 'click'
  }

  fromMutator(mutator) {
    // element level transformations
  }

  fromElement(element) {
    this.outputs.push(element)
  }

  route(flow) {
    let that

    if (flow.constructor === Object) {
      return this.fromData(flow)
    }

    if (that = this.getElement(flow)) {
      return this.fromElement(that)
    }

    this.pipeline.push(flow)
  }

  prepare(packet) {

  }

  render() {
    let grid
    /*
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

    let mutationParser = ((previous, current) => {
      let response = current(previous);

      if (response !== undefined && response !== null) {
        return response;
      }

      return previous;
    }).bind(this);

    for (let source of this.sources) {
      let parsed = this.pipeline.reduce(parser, source);
      let cloned = this.element.cloneNode(true);

      let genetics = ((input) => {
        return compile(input, parsed.source);
      });

      let parasite = new Parasite(genetics);

      if (parsed.compiled === undefined) {
        parasite.infect(cloned);
        parsed.compiled = parasite.infection;
      } else {
        parasite.infection = parsed.compiled;
      }

      // reduce across mutators

      this.outputs.forEach(parasite.addChildren.bind(parasite));
    }
    */
  }

  pipe(flow) {
    this.route(flow)
    this.render()
    return this
  }
}
