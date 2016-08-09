// expert on exposure ;)
export default class Nudist {
	static expose(input) {
		if (typeof define === 'function') {
      define(input.name.toLowerCase(), [], function () { return input; } );
    }

    if (typeof module !== 'undefined') {
      module.exports = input;
    }

    if (typeof window !== 'undefined') {
      window[input.name] = input;
    }

    if (typeof global !== 'undefined') {
      global[input.name] = input;
    }

    if (typeof scope !== 'undefined') {
      scope[input.name] = input;
    }
	}
	constructor(program) {
		Nudist.expose(program);
	}
}
