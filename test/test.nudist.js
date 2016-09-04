import {should, expect} from 'chai'

import Nudist from '../src/nudist'

context('Nudist', function	() {
	describe('@expose(client)', function() {
		it('should make a client available', function() {
			global.define = function(){};
			Nudist.expose({
				'name': 'Example'
			});
		})
	});
});
