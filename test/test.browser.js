var expect = [chai.expect, chai.should()].shift()

var runtime = new Runtime();

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

		// this looks like a bug with the testing framework...

		// it('should be a working function', function() {
		// 	Alchemist.should.to.respondTo('fromQuerySelector');
		// });

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
	describe('#getChildren(element)', function() {});
	describe('#setChildren(element)', function() {});
	describe('#addChildren(element)', function() {});
	describe('#allChildren(element)', function() {});
	describe('#getAttributes(element)', function() {});
	describe('#setAttributes(element)', function() {});
	describe('#infect(element)', function() {});
	describe('#setMutator(method)', function(){});
});

describe('Nudist', function() {
	describe('@expose(client)', function() {});
});

describe('Template', function() {
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
