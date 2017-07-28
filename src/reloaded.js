class Distributor {
  constructor () {

  }
}

class Packet {
  constructor () {

  }
}

class Mutator {
  constructor () {

  }
}

class Source {
  constructor () {

  }
}

let message
let source

// initialization
message = new Template('#message')

// generation
greeting = new Source({
  title: 'Untitled Document',
  from: 'Anonymous',
  content: 'Hello, world!'
})

// preperation
message.pipe(greeting)

// destination
message.pipe('#messages')

/* Optional // */

let helper
let synchronization

// mutation

// work with objects
function timestamp (input) {
  return {now: new Date()} // output
}

// work with elements
function virus (input) {
  return Alchemist.synthesize(disease).infect(input)
}

helper = new Mutator(timestamp)
synchronization = new Mutator(virus)

// will be sorted automatically

message.pipe(helper)
message.pipe(synchronization)

greeting.update({title: 'Greetings!'})
