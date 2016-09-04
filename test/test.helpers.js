import {should, expect} from 'chai'

import * as Helpers from '../src/helpers.js'

should();

context('Helpers', function() {
	describe('is', function() {
		describe('element', function() {
			it('should return true for an Element', function() {
				Helpers.is.element(document.createElement('div')).should.be.true;
			});

			it('should return false for anything else', function() {
				Helpers.is.element('').should.be.false;
			});
		});

		describe('fragment', function() {
			it('should return true for a DocumentFragment', function() {
				Helpers.is.fragment(document.createElement('template').content).should.be.true;
			});

			it('should return false for anything else', function() {
				Helpers.is.fragment('').should.be.false;
			});
		});

		describe('text', function() {
			it('should return true for a TextNode', function() {
				Helpers.is.text(document.createTextNode('')).should.be.true;
			});

			it('should return false for anything else', function() {
				Helpers.is.text('').should.be.false;
			});
		});

		describe('equal', function() {
			it('should two equal values should be true no matter what they are', function() {
				Helpers.is.equal(false, false).should.be.true;
			});

			it('should not flag negation of true-true equals', function() {
				Helpers.is.not.equal(true, true).should.be.false;
			});

			it('should return false if they are different types', function() {
				Helpers.is.equal('false', false).should.be.false;
			});

			it('should return false if they have different constructors', function() {
				Helpers.is.equal({}, []).should.be.false;
			});

			it('should be false if they have different properties', function() {
				Helpers.is.equal({a: 'b'}, {a: 'c'}).should.be.false;
			});

			it('should be false if one side is missing a property', function() {
				Helpers.is.equal({a: 'b'}, {a: 'b', c: 'd'}).should.be.false;
			});

			it('should be false if they are similar but have different values', function() {
				Helpers.is.equal('yes', 'no').should.be.false;
			});
		});

		describe('existant', function() {
			it('should not show existance if it is null or undefined', function() {
				Helpers.is.existant(undefined).should.be.false;
			});

			it('should not show existance with inversion and a proper value', function() {
				Helpers.is.not.existant(true).should.be.false;
			})
		});
	});

	describe('as', function() {
		describe('array', function() {
			it('should turn arguments into an array', function() {
				Helpers.as.array("string").should.be.instanceof(Array);
			});
		});

		describe('method', function() {
			let f0, f1, f2, f3;

			before(function() {
				f0 = (function(a, b) { return this; }).bind(this);
				f1 = function(a) { return a; };
				f2 = function(a, b) { return a && b; };
			});

			it('should curry an existing function', function() {
				Helpers.as.method(f2).should.be.a('function');
			});

			it('should modify functions with more than one parameter', function() {
				Helpers.as.method(f2).should.not.be.eql(f2);
			});

			it('should not instantly call a function with multiple parameters', function() {
				Helpers.as.method(f2)(true).should.not.be.true;
			});

			it('should eventually call a function after all parameters have been supplied', function() {
				Helpers.as.method(f2)(true)(true).should.be.true;
			});

			it('should allow binding of a function scope', function() {
				Helpers.as.method(f0, true)(true)(true).should.exist;
			});

			it('should allow supplying of multiple arguments at once', function() {
				Helpers.as.method(f2)(true, true).should.be.true;
			});

			it('should allow skipping and going back to other arguments', function() {
				Helpers.as.method(f2)(undefined, true)(true).should.be.true;
			});
		});

		describe('decomposed', function() {
			it('should gracefully replace waterfall of mutators with an initial value', function() {
				Helpers.as.decomposed([
					((it) => it),
					((it) => {return null})
				], true).should.be.true;
			});

			it('should gracefully replace waterfall of mutators without an initial value', function() {
				Helpers.as.decomposed([
					((it) => it),
					((it) => {return true})
				])().should.be.true;
			});

			it('should gracefully replace waterfall of mutators with a curried value', function() {
				Helpers.as.decomposed([
					((it) => it),
					((it) => {return null})
				])(true).should.be.true;
			});
		});

		describe('attempt', function() {
			it('should return mutation if method can mutate them', function() {
				Helpers.as.attempt(x => !x, false).should.be.true;
			});

			it('should also work with multiple parameters', function() {
				Helpers.as.attempt((x, y) => x && y, true, true).should.be.true;
			});

			it('should return parameters if method can not modify them', function() {
				Helpers.as.attempt(x => null, true).should.be.true;
			});
		});
	});
});
