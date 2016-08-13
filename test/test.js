// import { version } from '../package.json';
// import { expect } from 'chai';
// import DOMPlugin from 'chai-dom';
// import Template from '../index.js';
var JSONReader;

JSONReader = (function(){
	var fs = require('fs');
	var path = require('path');
	function JSONReader(filename) {
		filename = path.resolve(__dirname + '/' + filename);
		var contents;
		contents = fs.readFileSync(filename);
		contents = contents.toString();
		contents = JSON.parse(contents);
		return contents;
	}
	return JSONReader;
}());

var version = (new JSONReader('../package.json')).version;

var chai = require('chai');
var expect = chai.expect;

chai.should();
chai.use(require('chai-as-promised'));
// var DOMPlugin = require('chai-dom');

var Template = require('../index.js');

// chai.use(DOMPlugin);

describe('Alchemist', function() {
	describe('@asElement()', function(){});
	describe('#setElement(element)', function() {});
	describe('#getElement(element)', function() {});
});

describe('Parasite', function() {
	describe('#getChildren(element)', function() {});
	describe('#setChildren(element)', function() {});
	describe('#getAttributes(element)', function() {});
	describe('#setAttributes(element)', function() {});
	describe('#infect(element)', function() {});
	describe('#setMutator(method)', function(){});
});

describe('Nudist', function() {
	describe('@expose(client)', function() {});
});

describe('Template', function() {
	describe('constructor', function() {});
	describe('version', function() {
		it('should be the current version', function() {
			expect(version).to.be.eql((new Template()).version);
		})
	});
	describe('#setElement(element)', function() {});
	describe('#getEventSource(source)', function() {});
	describe('#getEvent(event)', function() {});
	describe('#getData(data)', function() {});
	describe('#getHandler(handler)', function() {});
	describe('#getMutator(mutator)', function() {});
	describe('#route(connection)', function() {});
	describe('#render(renderer)', function() {});
	describe('#pipe(flow)', function() {});
});

describe('Environment', function() {
	describe('Template', function(){
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
});
