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
		it('should peacefully generate with a Query Selector', function() {
			var magician;

			magician = new Alchemist('body');

			expect(magician).to.exist;
		});
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
