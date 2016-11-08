
let query = (object, property) => {
	let regexp = /[.{}]/g;
	let filter = source => source;
	let reduce = (source, key) => source[key];

	return property
	.split(regexp)
	.filter(filter)
	.reduce(reduce, object);
};

let compile = (value, data) => {
	var regexp;
	var replacement;

  regexp =  /\{([^}]+)\}/g;
  replacement = (original, property) => query(data, property) || '';

	return value
	.trim()
	.replace(regexp, replacement);
};

export query;
export compile;
