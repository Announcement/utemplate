/** @module helpers */

/**
 * Lazy way of turning an item into an Array
 * @function array$
 *
 * @param {Object} it - Array like object
 *
 * @return {Array}
 */
var array$ = function (it) {
	return Array.prototype.slice.call(it, 0);
}

/**
 * Appends values to an Array,
 * but first replaces undefined values before adding to the end
 *
 * @function combine
 *
 * @param {Array} array - list of existing items
 * @param {Array} values - proposed additions to the lsit
 *
 * @return {Array}
 */
function combine(array, values) {
	var index;

	array = array.concat([]);

	while ((index = array.indexOf(undefined)) !== -1 && values.length > 0) {
		array[index] = values.shift();
	}

	return array.concat(values);
}

/**
 * Returns a modified function that can be called with currying
 *
 * @function curry
 *
 * @see array$
 *
 * @param {Function} method - function to be curried
 *
 * @return {Function}
 */
function curry$(method) {
	function transform(params) {
		var context;
		return function() {
			var args = combine(params, array$(arguments));
			context = context || this;

			if (args.length < method.length || args.some(it => it === undefined )) {
				return transform(args);
			} else {
				return method.apply(context, args);
			}
		}
	}
	return method.length <= 1 ? method : transform([]);
}

/**
 * Returns a modified version of a function with negated boolean output
 *
 * @function negated
 *
 * @param {Function} it - method to be negated
 *
 * @return {Function}
 */
function negated$(it) {
	return function() {
		return !it.apply(this, arguments);
	};
}

/**
 * Pairs an object into a set of {key, value} arrays
 *
 * @function pair
 *
 * @param {Object} object - collection to be paired
 *
 * @return {Array.<{name: string, value}>}
 */
function pair(object) {
	return Object.keys(object).map((key) => {
		return {key: key, value: object[key]};
	});
}

/**
 * Curried shortcut to hasOwnProperty
 *
 * @function has
 *
 * @param {Object} object - collection containing property
 * @param {String} property - property name to be checked
 *
 * @return {boolean}
 */

let has = curry$((object, property) => {
	return object.hasOwnProperty(property);
});

/**
 * Recursively brings arrays to the highest level
 *
 * @function flatten
 *
 * @param {Array.<Array>} array - container of the set
 *
 * @return Array
 */
function flatten(array) {
	var isArray;
	var toArray;
	var fromArray;
	
	isArray = it => it.constructor === Array;
	toArray = it => isArray(it) ? it : [it];
	fromArray = (a, b) => a.concat(b);

	while (array.some(isArray)) {
		array = array.map(toArray).reduce(fromArray);
	}

	return array;
}

/**
 * Compares reference object to another object
 *
 * @function equals
 *
 * @see has
 * @see pair
 *
 * @param {Object} reference - what should be compared to
 * @param {Object} object - what we are comparing
 *
 * @return {boolean}
 */
function equals(reference, object) {
	// Are they of the same type?
	if (typeof reference !== typeof object ||
			reference.constructor !== object.constructor) {
		return false;
	}

	// Do we need to check recursively?
	if (reference.constructor !== Object) {
		return reference === object;
	}

	return flatten([
		pair(reference),
		pair(object)
	])
	.every((item) => {
		return
		has(reference)(item.key) &&
		has(object)(item.key) &&
		equals(reference[item.key], object[item.key])
	});
}
/**
 * Checks to see if an item exists (isn't null or undefined)
 * @function exists
 *
 * @param {Object} it - the item in question of existance
 *
 * @return {boolean}
 */
function exists(it) {
	return it !== undefined && it !== null;
}

/**
 * Attempts to apply mutation to subject, but returns the unmodified subject on failure
 *
 * @function attempt
 *
 * @see array$
 *
 * @param {Function} mutation - mutator function to be called on the subject
 * @param {Object} subject - any input that should be mutated
 *
 * @return {Object}
 */
function attempt(mutation, subject) {
	var parameters;
	var alternative;
	var response;

	parameters = array$(arguments).slice(1);
	alternative = parameters.length === 1 ? parameters[0] : parameters;

	response = mutation.apply(this, parameters);

	return response || alternative;
}

/**
 * Clones an object
 *
 * @function clone
 *
 * @param {Object} object - object to be cloned
 *
 * @return {Object}
 */
function clone(object) {
	return Object.assign({}, object);
}

/**
 * Injects a transformer into each element of a collection
 *
 * @name inject(it, transformer)
 *
 * @see attempt
 *
 * @param {Object} it - collection
 * @param {Function} tranform - mutator function
 *
 * @return {Object.<string, Function>}
 */
function inject(it, transform) {
	var copy = {};

	function cycle(key, value) {
		if (value === copy) {
			return false;
		}

		if (typeof value === 'function') {
			return attempt(transform, value);
		}

		if (typeof value === 'object') {
			return inject(value, transform);
		}

		// return value;
	}

	for (let key in it) {
		copy[key] = cycle(key, it[key]);
	}

	return copy;
};

/**
 * Prepares a collection of functions for shipping by currying and adding a not chain
 *
 * @name prepare(it)
 *
 * @see inject
 * @see negated$
 * @see curry$
 *
 * @param {Object.<string, Function>} it - collection of functions
 *
 * @return {Object.<string, Function>} - returns curried functions with an additional 'not' chain
 */
function prepare(it) {
	var not, tmp;

	not = inject(it, negated$);
	not = inject(not, curry$);
	tmp = inject(it, curry$);

	tmp.not = not;

	return tmp;
}

/**
 * Applies functions to a value and moves down the chain if possible
 *
 * @function decompose
 *
 * @see exists
 * @see attempt
 * @see array$
 *
 * @param {Array} array - list of functions to be applied
 * @param {Object} initial - optional initial item
 *
 * @return Object
 */
function decompose(array, initial) {
	let composer = (previous, current) => attempt(current, previous);
	let reducer = it => array.reduce(composer, initial || it);

	return initial ? reducer(initial) : reducer;
}

var is$ = {
	element: (object) => {
		// return object instanceof Element;
		return object.nodeType === document.ELEMENT_NODE;
	},

	fragment: (object) => {
		// return object.constructor === DocumentFragment;
		return object.nodeType === document.DOCUMENT_FRAGMENT_NODE;
	},

	text: (object) => {
		// return child.constructor === Text;
		return object.nodeType === document.TEXT_NODE;
	},

	equal: equals,
	existant: exists
};

is$ = prepare(is$);

export let is = is$;
export let as = {
	array: array$,
	pair: pair,
	method: curry$,
	flatten: flatten,
	decomposed: decompose,
	attempt: attempt
};
//
// console.log(is$.not.equal({a: 'b'}, {a: 'b', c: 'd'}));
