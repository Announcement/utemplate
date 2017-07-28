class Cache {
  constructor () {
    this.cells = []
  }

  static safe (item) {
    if (typeof item === 'function') {
      return item.name
    }
    return item
  }

  static multiply (rows, columns) {
    let cells = []
    let total = rows.length * columns.length

    for (var i = 0; i < total; i++) {
      let x = i % columns.length
      let y = Math.floor(i / columns.length)

      let column = columns[x]
      let row = rows[y]

      cells.push({column, row})
    }

    return cells
  }

  static exclude (list) {
    return function (item) {
      return list.indexOf(item) === -1
    }
  }

  updates (list) {
    let cells = this.cells
    let original = list.filter(Cache.exclude(cells))

    return original
  }
}

export default Cache
