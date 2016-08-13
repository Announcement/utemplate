var expect = [chai.expect, chai.should()].shift()

describe('Environment', function() {
	describe('Template', function(){
		it('should be accessable globally', function() {
			expect(Template).to.exist;
		});
	});

	describe('Alchemist', function(){
		it('should be accessable globally', function() {
			expect(Alchemist).to.exist;
		});
	});

	describe('Parasite', function(){
		it('should be accessable globally', function() {
			expect(Parasite).to.exist;
		});
	});

	describe('Document', function() {
		it('should be accessable globally', function() {
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
	})
});

describe('Alchemist', function() {
	describe('constructor', function() {
		it('should fail on an empty initialization attempt', function() {
			expect(function(){
				new Alchemist();
			}).to.throw(Error);
		});
		it('should successfully initialize provided an Element', function() {
			var magician;

			magician = new Alchemist(document.body);

			expect(magician).to.exist;
		});
	});

	describe('@asElement()', function(){
		it('should be an an accessable property from constructor', function() {
			expect(Alchemist).to.have.property('asElement');
		});

		it('should peacefully generate with an Element input', function() {
			var magician;

			magician = new Alchemist(document.body);

			expect(magician).to.exist;
		});
	});

	describe('@fromQuerySelector(string)', function(){
		it('should be an an accessable property from constructor', function() {
			expect(Alchemist).to.have.property('fromQuerySelector');
		});

		it('should transform a query selector', function() {
			expect(Alchemist.fromQuerySelector('body')).to.be.an.instanceof(Element);
		});

		it('should pass through non string objects', function() {
			expect(Alchemist.fromQuerySelector([])).to.be.an.instanceof(Array);
		});
	});

	describe('@fromSizzle(object)', function(){
		it('should be an an accessable property from constructor', function() {
			expect(Alchemist).to.have.property('fromSizzle');
		});

		it('should pass through non Sizzle objects', function() {
			expect(Alchemist.fromSizzle([])).to.be.an.instanceof(Array);
		});
	});

	describe('@fromTemplate(template)', function(){
		it('should be an an accessable property from constructor', function() {
			expect(Alchemist).to.have.property('fromTemplate');
		});

		it('should extract a DocumentFragment from a template', function() {
			var element;

			element = document.createElement('template');;

			expect(Alchemist.fromTemplate(element)).to.be.an.instanceof(DocumentFragment);
		});

		it('should pass through non template objects', function() {
			expect(Alchemist.fromTemplate([])).to.be.an.instanceof(Array);
		})
	});

	describe('@fromFragment(fragment)', function(){
		it('should be an an accessable property from constructor', function() {
			expect(Alchemist).to.have.property('fromFragment');
		});

		it('should extract an Element from a DocumentFragment', function() {
			var element;

			element = document.createElement('template');

			expect(Alchemist.fromFragment(element.content)).to.not.be.undefined
		});

		it('should pass through non template objects', function() {
			expect(Alchemist.fromFragment([])).to.be.an.instanceof(Array);
		})
	});

	describe('#setElement(element)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Alchemist).to.not.have.property('setElement');
		});

		it('should be an accessable property from instance', function() {
			var magician;

			magician = new Alchemist(document.body);

			expect(magician).to.have.property('setElement');
		});

		it('should be a working function', function() {
				var magician;

				magician = new Alchemist(document.body);

				magician.should.respondTo('setElement');
		});

		it('should accept an element', function() {
			expect(function() {
				var magician;

				magician = new Alchemist(document.body);

				magician.setElement(document.body);
			}).to.not.throw(Error);
		});
	});

	describe('#getElement(element)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Alchemist).to.not.have.property('getElement');
		});

		it('should be an accessable property from instance', function() {
			var magician;

			magician = new Alchemist(document.body);

			expect(magician).to.have.property('getElement');
		});

		it('should be a working function', function() {
				var magician;

				magician = new Alchemist(document.body);

				magician.should.respondTo('getElement');
		});

		it('should return an element', function() {
			var magician;

			magician = new Alchemist(document.body);

			expect(magician.getElement()).to.be.an.instanceof(Element);
		});
	});
});

describe('Parasite', function() {
	describe('#getChildren(element)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('getChildren');
		});

		it('should be an accessable property from instance', function() {
			var parasite;

			parasite = new Parasite(function(){});

			expect(parasite).to.have.property('getChildren');
		});
	});
	describe('#setChildren(element)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('setChildren');
		});

		it('should be an accessable property from instance', function() {
			var parasite;

			parasite = new Parasite(function(){});

			expect(parasite).to.have.property('setChildren');
		});
	});
	describe('#addChildren(element)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('addChildren');
		});

		it('should be an accessable property from instance', function() {
			var parasite;

			parasite = new Parasite(function(){});

			expect(parasite).to.have.property('addChildren');
		});
	});
	describe('#allChildren(element)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('allChildren');
		});

		it('should be an accessable property from instance', function() {
			var parasite;

			parasite = new Parasite(function(){});

			expect(parasite).to.have.property('allChildren');
		});
	});
	describe('#getAttributes(element)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('getAttributes');
		});

		it('should be an accessable property from instance', function() {
			var parasite;

			parasite = new Parasite(function(){});

			expect(parasite).to.have.property('getAttributes');
		});
	});
	describe('#setAttributes(element)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('setAttributes');
		});

		it('should be an accessable property from instance', function() {
			var parasite;

			parasite = new Parasite(function(){});

			expect(parasite).to.have.property('setAttributes');
		});
	});
	describe('#infect(element)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('infect');
		});

		it('should be an accessable property from instance', function() {
			var parasite;

			parasite = new Parasite(function(){});

			expect(parasite).to.have.property('infect');
		});
	});
	describe('#setMutator(method)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('setMutator');
		});

		it('should be an accessable property from instance', function() {
			var parasite;

			parasite = new Parasite(function(){});

			expect(parasite).to.have.property('setMutator');
		});
	});
});

describe('Nudist', function() {
	describe('@expose(client)', function() {
		it('should be an an accessable property from constructor', function() {
			expect(Nudist).to.have.property('expose');
		});
	});
});

describe('Template', function() {
	describe('#setElement(element)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('setElement');
		});

		it('should be an accessable property from instance', function() {
			var template;
			var element;

			element = document.createElement('template');

			template = new Template(element);

			expect(template).to.have.property('setElement');
		});
	});
	describe('#fromEventSource(source)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('fromEventSource');
		});

		it('should be an accessable property from instance', function() {
			var template;
			var element;

			element = document.createElement('template');

			template = new Template(element);

			expect(template).to.have.property('fromEventSource');
		});
	});
	describe('#fromEvent(event)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('fromEvent');
		});

		it('should be an accessable property from instance', function() {
			var template;
			var element;

			element = document.createElement('template');

			template = new Template(element);

			expect(template).to.have.property('fromEvent');
		});

	});
	describe('#fromData(data)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('fromData');
		});

		it('should be an accessable property from instance', function() {
			var template;
			var element;

			element = document.createElement('template');

			template = new Template(element);

			expect(template).to.have.property('fromData');
		});

	});
	describe('#fromHandler(handler)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('fromHandler');
		});

		it('should be an accessable property from instance', function() {
			var template;
			var element;

			element = document.createElement('template');

			template = new Template(element);

			expect(template).to.have.property('fromHandler');
		});

	});
	describe('#fromMutator(mutator)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('fromMutator');
		});

		it('should be an accessable property from instance', function() {
			var template;
			var element;

			element = document.createElement('template');

			template = new Template(element);

			expect(template).to.have.property('fromMutator');
		});

	});
	describe('#route(connection)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('route');
		});

		it('should be an accessable property from instance', function() {
			var template;
			var element;

			element = document.createElement('template');

			template = new Template(element);

			expect(template).to.have.property('route');
		});

	});
	describe('#render(renderer)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('render');
		});

		it('should be an accessable property from instance', function() {
			var template;
			var element;

			element = document.createElement('template');

			template = new Template(element);

			expect(template).to.have.property('render');
		});

	});
	describe('#pipe(flow)', function() {
		it('should not be an accessable property from constructor', function() {
			expect(Parasite).to.not.have.property('pipe');
		});

		it('should be an accessable property from instance', function() {
			var template;
			var element;

			element = document.createElement('template');

			template = new Template(element);

			expect(template).to.have.property('pipe');
		});

	});
});
