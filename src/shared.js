 /**
  * Pull a specific property from an object.
  * @function query
  *
  * @version 1
  * @since 0.3.0
  *
  * @param {Object} object - Deep object of strings.
  * @param {String} property - A dot (`.`) seperated property identifier.
  *
  * @returns {String} Representing the value identified by the property in the object.
  */
let query = (object, property) => {
  let regexp = /[.{}]/g
  let filter = source => source
  let reduce = (source, key) => source[key]

  return property
  .split(regexp)
  .filter(filter)
  .reduce(reduce, object)
}

/**
 * Replaces all {property} instances with their respective value.
 * @function compile
 *
 * @version 1
 * @since 0.3.0
 *
 * @param {String} value - The entire string with the instances to be replaced.
 * @param {Object} data - The data object to pull values from.
 *
 * @returns {String} Containg all the replaced instances.
 */
let compile = (value, data) => {
  var regexp
  var replacement

  regexp = /\{([^}]+)\}/g
  replacement = (original, property) => query(data, property) || ''

  return value
  .trim()
  .replace(regexp, replacement)
}

export {query, compile}
