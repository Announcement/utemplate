import {should, expect} from 'chai'
import blanket from 'blanket'

import { version } from '../package.json'

import Template from '../src/template'
import Alchemist from '../src/alchemist'
import Nudist from '../src/nudist'
import Parasite from '../src/parasite'

import * as Helpers from '../src/helpers'


// var chai = require('chai');
// var should = chai.should, expect = chai.expect;
// var Template = require('../index.js');

should();

context('Environment', function() {
	describe('Template', function() {
		it('expect to be available globally', function() {
			expect(Template).to.exist;
		});
	});

	describe('Alchemist', function(){
		it('expect to be available globally', function() {
			expect(Alchemist).to.exist;
		});
	});

	describe('Parasite', function(){
		it('expect to be available globally', function() {
			expect(Parasite).to.exist;
		});
	});

	describe('Nudist', function(){
		it('expect to be available globally', function() {
			expect(Nudist).to.exist;
		});
	});

	describe('Document', function() {
		it('should be available globally', function() {
			expect(document).to.exist;
		});

		it('should have a body property', function() {
			expect(document).to.have.property('body');
		});

		it('should have some children', function() {
			expect(document.children.length).to.be.above(0);
		});

		it('should be completely loaded', function() {
			expect(document.readyState).to.eql('complete');
		});
	});
});
