var expect = chai.expect;

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
		it('should be available globally', function() {
			expect(Template).to.exist;
		});
	});
	describe('Alchemist', function(){
		it('should be available globally', function() {
			expect(Alchemist).to.exist;
		});
	});
	describe('Parasite', function(){
		it('should be available globally', function() {
			expect(Parasite).to.exist;
		});
	});
});
