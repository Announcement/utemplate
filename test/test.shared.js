import { should, expect } from 'chai'
import { query, compile } from '../src/shared.js'

should()

context('Shared', function () {
  let object = { a: { b: 'c' }, ping: 'pong' }
  describe('#query()', function () {
    it('should successfully query shallow property requests', function () {
      let property = 'ping'
      let value = 'pong'

      query(object, property).should.equal(value)
    })

    it('should successfully query deep property requests', function () {
      let property = 'a.b'
      let value = 'c'

      query(object, property).should.equal(value)
    })
  })

  describe('#compile()', function () {
    let data = {
      name: 'jake',
      programming: { language: 'ecmascript' }
    }

    it('should replace all instances of queried properties', function () {
      let value = '{name} likes {programming.language}'
      let expected = 'jake likes ecmascript'

      compile(value, data).should.equal(expected)
    })
  })
})
