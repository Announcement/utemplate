import Alchemist from './alchemist'
import Parasite from './parasite'
import {is} from './helpers'
import {query, compile} from './shared'

let genetics = function(source) {
  return (input) => compile(input, source)
}

export default class Template {
  constructor(element) {
    this.rendered = []

    this.setTemplate(element)
  }

  setTemplate(it) {
    let element

    element = Alchemist.asElement(it)
    this.template = element

    return element
  }

  getTemplate() {
    return this.template
  }

  fromObject(object) {
    let template
    let cloned
    let parasite
    let element
    let packet

    template = this.getTemplate()
    cloned = template.cloneNode(true)
    parasite = new Parasite(genetics(object))

    element = parasite.infect(cloned)

    packet = {
      'object': object,
      'element': element,
      'parasite': parasite,
    }

    this.rendered.push(packet)

    return element
  }

  setOutput(it) {
    let element
    let that

    element = Alchemist.asElement(it)

    let append = (it) => it.parasite.addChildren(element)
    let getNext = (it) => this.rendered.shift()

    while (this.rendered.length) {
      setContent(getValue())
    }
  }

}
