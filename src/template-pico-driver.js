import { query, compile } from './shared'
import { version } from '../package.json'

/**
  * @version 1
  */
export default class Template {
  static get version () {
    return version
  }

  constructor (it) {
    this.setSource(it)
    this.setDestination(`${it}s`)
  }

  /**
   * Set the source element for the template.
   * @method setSource
   *
   * @param {String} it - The querySelector for source element.
   */
  setSource (it) {
    this.from = document.querySelector(it)
    this.source = this.from.innerHTML + ''
  }

  /**
   * Set the destination element for the template.
   * @method setDestination
   *
   * @param {String} it - The querySelector for the destination element.
   */
  setDestination (it) {
    this.to = document.fromQuerySelector(it)
  }

  /**
   * Compile template data.
   * @method render
   *
   * @param {Object} it - Data to be compiled into template.
   *
   * @returns {String} Representing the compiled template.
   */
  render (it) {
    return compile(this.source, it)
  }

  /**
   * Render template data to destination.
   * @method generate
   *
   * @param {Object} it - Data to be passed to render.
   */
  generate (it) {
    to.innerHTML += this.render(it)
  }
}
