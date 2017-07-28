'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Distributor = function Distributor() {
  _classCallCheck(this, Distributor);
};

var Packet = function Packet() {
  _classCallCheck(this, Packet);
};

var Mutator = function Mutator() {
  _classCallCheck(this, Mutator);
};

var Source = function Source() {
  _classCallCheck(this, Source);
};

var message = void 0;
var source = void 0;

// initialization
message = new Template('#message');

// generation
greeting = new Source({
  title: 'Untitled Document',
  from: 'Anonymous',
  content: 'Hello, world!'
});

// preperation
message.pipe(greeting);

// destination
message.pipe('#messages');

/* Optional // */

var helper = void 0;
var synchronization = void 0;

// mutation

// work with objects
function timestamp(input) {
  return { now: new Date() }; // output
}

// work with elements
function virus(input) {
  return Alchemist.synthesize(disease).infect(input);
}

helper = new Mutator(timestamp);
synchronization = new Mutator(virus);

// will be sorted automatically

message.pipe(helper);
message.pipe(synchronization);

greeting.update({ title: 'Greetings!' });