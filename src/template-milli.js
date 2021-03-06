import {version} from '../package.json'
import Alchemist from './alchemist'
import Parasite from './parasite'
import {is, as} from './helpers'
import {query, compile} from './shared'

let genetics = source => input => compile(input, source)

export default class Template {
  constructor (source) {
    this.source = Alchemist.asElement(source)
    this.methods = []
    this.sources = []
  }

  static get version () {
    return version
  }

  setMutations (source) {
    let methods

    methods = this.methods
  }

  setSources (method) {
    let sources

    sources = this.sources.map(method)

    this.sources = sources
  }

  provide () {
    let output

    output = this.output

    if (is.not.existant(output)) {
      return false
    }

    this.setSources((source) => {
      if (is.existant(source.children)) {
        return source
      }

      let parasite
      let compiled
      let children

      parasite = source.parasite
      compiled = source.compiled

      children = parasite.addChildren(output)
      source.children = children

      return source
    })
  }

  generate () {
    let template
    let methods

    template = this.source
    methods = this.methods

    let isInfected = (it) => {
      let content = it.parsed || it.content

      if (is.not.existant(it.parasite)) {
        it.parasite = new Parasite(genetics(content))
      }

      return it.parasite
    }

    let isCompiled = (it) => {
      if (is.not.existant(it.compiled)) {
        let cloned = template.cloneNode(true)
        let element = it.parasite.infect(cloned)
      }

      return it.compiled
    }

    let eachMutation = (it) => {
      let result

      result = methods.reduce(function (previous, current, index) {
        let rendered

        rendered = current(previous)
        it.mutations[index] = rendered

        return rendered || previous
      }, it.content)

      it.parsed = result

      return result
    }

    let isMutation = (it) => {
      if (is.not.existant(it.mutations)) {
        it.mutations = []
      }

      if (it.mutations.length < methods.length) {
        eachMutation(it)
      }

      return it.mutations
    }

    this.setSources((source) => {
      let mutation = isMutation(source)
      let infected = isInfected(source)
      let compiled = isCompiled(source)

      return source
    })
  }

  setDestination (it) {
    let element

    element = Alchemist.asElement(it)

    if (is.not.existant(element)) {
      return false
    }

    this.output = element

    if (this.sources.length > 0) {
      this.provide()
    }

    return element
  }

  fromObject (it) {
    let packet

    if (it.constructor !== Object) {
      return false
    }

    packet = {}
    packet.content = it

    this.sources.push(packet)

    this.generate()
    this.provide()

    return it
  }

  fromMethod (it) {
    if (it.constructor !== Function) {
      return false
    }

    this.generate()
    this.methods.push(it)

    return it
  }

  pipe (object) {
    let waterfall
    let result

    waterfall = [
      this.setDestination,
      this.fromObject,
      this.fromMethod
    ]

    waterfall.some(method => result = method.call(this, object))

    return this
  }
}
