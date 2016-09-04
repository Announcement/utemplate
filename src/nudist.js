// expert on exposure ;)
export default class Nudist {
	static expose(input) {
		if (typeof define === 'function') {
      define(input);
    }

		([
			window,
			global
		])
			.filter(function(it) { return it; })
			.forEach(function(it) { it[input.name] = input; });
	}
	constructor(program) {
		Nudist.expose(program);
	}
}
