import {should, expect} from 'chai'

import Parasite from '../src/parasite.js'

should();

context('Parasite', function() {
	var dna, rna, parasite, template;

	before('define a genetic strand for parasite initialization', function(){
		dna = function dna(it) {return it};
		rna = function rna(it) {};

		template = document.createElement('template');

		template.content.appendChild(document.createElement('div'));
		template.content.appendChild(document.createTextNode('Hello, world!'));
		template.content.appendChild(document.createTextNode('  '));

		template.setAttribute('id', 'utemplate');
		template.setAttribute('class', '  ');

		document.body.appendChild(template);
	});

	beforeEach('generate a new parasite for each test', function() {
		parasite = new Parasite(dna);
	});

	after(function() {
		document.body.removeChild(template);
	});

	describe('#getChildren(element)', function() {
		it('should be a property from the instance', function() {
			parasite.should.have.property('getChildren');
		});

		it('should not be available from the constructor', function() {
			Parasite.should.not.have.property('getChildren');
		});
	});

	describe('#allChildren(element)', function() {
		it('should be a property from the instance', function() {
			parasite.should.have.property('allChildren');
		});

		it('should not be available from the constructor', function() {
			Parasite.should.not.have.property('allChildren');
		});

		it('should list all children recursively of an element', function() {
			parasite.allChildren(document.body).should.exist;
		});
	});

	describe('#setChildren(element)', function() {
		it('should be a property from the instance', function() {
			parasite.should.have.property('setChildren');
		});

		it('should not be available from the constructor', function() {
			Parasite.should.not.have.property('setChildren');
		});

		it('should change the contents and attributes of an element', function(){
			parasite.setChildren(document.body).should.exist;
		});
	});

	describe('#getAttributes(element)', function() {
		it('should be a property from the instance', function() {
			parasite.should.have.property('getAttributes');
		});

		it('should not be available from the constructor', function() {
			Parasite.should.not.have.property('getAttributes');
		});

		it('should return attributes as a list from an element', function() {
			parasite.getAttributes(template).should.be.an('array');
		});
	});

	describe('#setAttributes(element)', function() {
		it('should be a property from the instance', function() {
			parasite.should.have.property('setAttributes');
		});

		it('should not be available from the constructor', function() {
			Parasite.should.not.have.property('setAttributes');
		});

	});

	describe('#infect(element)', function() {
		it('should be a property from the instance', function() {
			parasite.should.have.property('infect');
		});

		it('should not be available from the constructor', function() {
			Parasite.should.not.have.property('infect');
		});

		it('should setChildren and save a modified element', function() {
			parasite.infect(document.body).should.exist;
		});

		it('should not mutate with read only', function() {
			parasite = new Parasite(rna);
			parasite.infect(document.body).should.exist;
		});
	});

	describe('#setMutator(method)', function() {
		it('should be a property from the instance', function() {
			parasite.should.have.property('setMutator');
		});

		it('should not be available from the constructor', function() {
			Parasite.should.not.have.property('setMutator');
		});
	});
	describe('#addChildren(parent)', function() {
		it('should be a property from the instance', function() {
			parasite.should.have.property('addChildren');
		});

		it('should not be available from the constructor', function() {
			Parasite.should.not.have.property('addChildren');
		});

		it('should add all of the contents to the target element', function() {
			let length = document.body.childNodes.length;
			parasite.infect(template);
			parasite.addChildren(document.body).should.exist;
		});
		it('should ignore repeat adding process for previously existing elements', function() {
			let length = document.body.childNodes.length;
			parasite.infect(template);
			parasite.addChildren(document.body);
			parasite.addChildren(document.body);
			document.body.childNodes.length.should.be.eql(parasite.infection.childNodes.length + length);
		});
	});
});
