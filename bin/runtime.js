function Runtime() {
	var ready;
	var actions;
	actions = [];

	function handle(promise, method) {
		var result;
		try {
			result = method();
		} catch (exception) {
			promise.reject(exception);
		} finally {
			if (result !== undefined) {
				promise.resolve(result);
			}
		}
	}

	window.addEventListener('load', function() {
		ready = true;
		actions.forEach(function(packet) {
			handle(packet.promise, packet.method);
		});
	});

	function doSomething(method) {
		var promise = new Promise();

		if (ready) {
			handle(promise, method);
		} else {
			actions.push({promise: promise, method: method});
		}
		return promise;
	}

	return doSomething;
}

window.Runtime = Runtime;
