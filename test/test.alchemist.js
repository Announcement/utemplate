import {should, expect} from 'chai'
import Alchemist from '../src/alchemist'

should();

context('Alchemist', function() {
	var element, alchemist;

	before('generate an element for initialization', function() {
		element = document.createElement('template');
		element.content.appendChild(document.createElement('div'));
		element.content.appendChild(document.createTextNode('Hello, world!'));
		element.content.appendChild(document.createTextNode('   '));
		element.setAttribute('class', '   ');
		element.setAttribute('id', 'utemplate');
	});

	describe('#fromQuerySelector(element)', function() {
		it('should be a property from the instance', function() {
			Alchemist.should.have.property('fromQuerySelector');
		});

		it('should successfully initialize with a query selector', function() {
			expect(Alchemist.fromQuerySelector('body')).to.exist;
		});
	});

	describe('#fromSizzle(element)', function() {
		it('should be a property from the instance', function() {
			Alchemist.should.have.property('fromSizzle');
		});

		it('should retrieve from a sizzle compatible instance', function() {
			Alchemist.fromSizzle({
				get: () => element
			}).should.exist;
		});
	});
	describe('#fromTemplate(element)', function() {
		it('should be a property from the instance', function() {
			Alchemist.should.have.property('fromTemplate');
		});

		it('should retrieve the fragment from a template', function() {
			expect(Alchemist.fromTemplate(element)).to.exist;
		});
	});
	describe('#fromFragment(element)', function() {
		it('should be a property from the instance', function() {
			Alchemist.should.have.property('fromFragment');
		});

		it('should retrieve the element from a fragment', function() {
			expect(Alchemist.fromFragment(element.content)).to.exist;
		});
	});
	describe('@asElement()', function(){
		it('should be available from the constructor', function() {
			Alchemist.should.have.property('asElement');
		});

		it('should retrieve an element', function() {
			expect(function() {
				Alchemist.asElement(element);
			}).to.not.throw(Error);
		});

		it('should do nothing if an element could not be found', function() {
			expect(Alchemist.asElement(null)).to.not.exist;
		});

		it('should accept a DocuemntFragment and jump right in the chain of events', function() {
			expect(Alchemist.asElement(element.content)).to.exist;
		});
	});

	describe('#setElement(element)', function() {
		var alchemist;

		beforeEach(function() {
			alchemist = new Alchemist(element);
		});

		it('should be a property from the instance', function() {
			alchemist.should.have.property('setElement');
		});

		it('should not be available from the constructor', function() {
			Alchemist.should.not.have.property('setElement');
		});

		it('should modify the current element cache', function() {
			alchemist.setElement(element.content.firstElementChild).element.should.not.be.eql(element);
		});
	});

	describe('#getElement(element)', function() {
		var alchemist;

		before(function() {
				alchemist = new Alchemist(element);
		});

		it('should be a property from the instance', function() {
			alchemist.should.have.property('getElement');
		});

		it('should not be available from the constructor', function() {
			Alchemist.should.not.have.property('getElement');
		});

		it('should retrieve an element from the cache', function() {
			alchemist.getElement().should.exist;
		});
	});
});
