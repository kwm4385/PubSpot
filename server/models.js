var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var tapSchema = mongoose.Schema({
  location: { type: String, trim: true },
  handle: { type: Number, min: 0 },
  beer: {
    name: { type: String, trim: true },
    id: { type: Number, min: 0 }
  }
});

var Tap = mongoose.model('Taps', tapSchema);

module.exports = { Tap }