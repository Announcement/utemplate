require('chai').should()

describe 'document', ->

  # a virtual document, courtesy of pseudo
  {document} = require './pseudo'

  describe '#createElement()', !->
    e = document.createElement()

    it 'should be of class Element', !->
      e.constructor.displayName.should.eql 'Element'

    it 'should have a div tagname', !->
      e.tagname.should.eql 'div'

    it 'should have the correct owner document', !->
      e.ownerDocument.should.eql document
