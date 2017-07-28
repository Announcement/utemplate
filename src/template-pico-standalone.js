/*
  This is not a driver!
  This is a standalone copy-paste program included for convenience.

  Benefits:
    - Impressively light weight (lite, embeddable)

  Restrictions:
    - Specific target/source naming scheme (target = source + 's')
    - No pipeline available

  Things to be aware of:
    - Very high security risk
    - Extremely low performance
    - Volatile, no catches, checks, etc.
 */

/**
 * Acquires a property from an object.
 * @function query
 * @version 1
 *
 * @param {Object.<string>} object - Container of insertion key-value pairs
 * @param {String} property - named key of object to be pulled from
 *
 * @return {String}
 */
let query = (object, property) => {
  let regexp = /[.{}]/g
  let filter = source => source
  let reduce = (source, key) => source[key]

  return property.split(regexp).filter(filter).reduce(reduce, object)
}

/**
 * Pulls all specified content from a data source designated by value queries.
 * @function compile
 *
 * @param {String} value - string of text containing potential queries
 * @param {Object.<string>} data - data source to pull query data from
 *
 * @return {String}
 */
let compile = (value, data) => {
  let regexp = /\{([^}]+)\}/g

  let replacement = (original, property) => {
    return query(data, property) || ''
  }

  return value.trim().replace(regexp, replacement)
}

/**
 * Prepares a specified template and related target to generate data
 * @function pico template
 *
 * @param {String} namespace - name of template (and target source)
 *
 * @return {Function}
 */

function Pico (namespace) {
  let from
  let to
  let source

  from = document.querySelector(namespace)
  to = document.querySelector(namespace + 's')

  source = from.innerHTML + ''

  /**
   * Generates data from an object and inserts it.
   * @function pico template generator
   *
   * @param {Object.<String>} data - content to be rendered
   */
  return function (data) {
    to.innerHTML += compile(source, data)
  }
}
