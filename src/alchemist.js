import { is, as } from './helpers'

// transmutating elements =)
export default class Alchemist {
  constructor (element) {
    this.setElement(element)
  }

  static isQuerySelector (element) {
    return typeof element === 'string'
  }
  static fromQuerySelector (element) {
    return document.querySelector(element)
  }

  static isSizzle (element) {
    return typeof element === 'function'
  }
  static fromSizzle (element) {
    return element.get(0)
  }

  static isTemplate (element) {
    return is.element(element)
  }
  static fromTemplate (element) {
    return element.content
  }

  static isFragment (element) {
    return is.fragment(element) && element.hasChildNodes()
  }
  static fromFragment (element) {
    return element.firstElementChild
  }

  static asElement (element) {
    let waterfall = [
      Alchemist.fromQuerySelector,
      Alchemist.fromSizzle,
      Alchemist.fromTemplate,
      Alchemist.fromFragment
    ]

    let result = as.decomposed(waterfall, element)

    // element is already provided
    if (result && is.element(result)) {
      return result
    }
  }

  setElement (element) {
    this.element = Alchemist.asElement(element)
    return this
  }

  getElement () {
    return this.element
  }
}
