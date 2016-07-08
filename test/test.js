require('chai').should();
describe('document', function() {
  var pseudo;
  var document;

  pseudo = require('./pseudo');
  document = pseudo.document;

  describe('#createElement()', function() {
    it('should be of class Element', function() {
      document.constructor.equal(pseudo.Element);
    });
  })
});
