import {compile} from './share'

class Slow {
  constructor (template) {
    this.source = template
    this.methods = []
    this.sources = []
  }

  generate () {
    var sources
    var methods

    sources = this.sources
    methods = this.methods

    return sources.map(source => {
      var cache

      cache = methods.map((method) => {
        return {source, method}
      })

      var item
      var items
      var current

      item = cache.shift()

      item.response = item.method(item.source)

      items = [item]

      while (cache.length) {
        current = cache.shift()
        current.response = current.method(item.response)
        items.push(current)
        item = current
      }

      return items
    })
  }
}

var sources = ['a', 'b']
var methods = [x => x + 'y', x => x + 'z']

function generate () {
  return sources.map(source => {
    var cache

    cache = methods.map((method) => {
      return {source, method}
    })

    var item
    var items
    var current

    item = cache.shift()

    item.response = item.method(item.source)

    items = [item]

    while (cache.length) {
      current = cache.shift()

      current.response = current.method(item.response)

      items.push(current)

      item = current
    }

    return items
  })
}

generate()

export {Slow as default}
