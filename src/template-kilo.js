import {version} from '../package.json'
// import {is, as} from 'helpers'

import Alchemist from './alchemist'
// import Symbiotic from './symbiotic'

import Cache from './cache'

export default class Kilo {

  constructor (source) {
    this.source = Alchemist.asElement(source)

    this.cache = new Cache()

    this.methods = []
    this.sources = []
  }

  static get version () {
    return version
  }

  synchronize () {
    let sources = this.sources
    let methods = this.methods
    let cache = this.cache

    let cells = Cache.multiply(sources, methods)
    let updates = cache.update(cells)

    console.log(updates)
  }

  addSource (source) {
    this.sources.push(source)
    this.synchronize()
  }

  addSources (...sources) {
    sources.forEach(it => this.sources.push(it))
    this.synchronize()
  }

  addMethod (method) {
    this.methods.push(method)
  }

  addMethods (...methods) {
    methods.forEach(it => this.methods.push(it))
    this.synchronize()
  }
}
