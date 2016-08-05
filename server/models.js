var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var tapSchema = mongoose.Schema({
  location: {
    building: { type: String, trim: true },
    room: { type: String, trim: true }
  },
  handle: { type: Number, min: 0 },
  beer: {
    name: { type: String, trim: true },
    id: { type: Number, min: 0 }
  },
  kicked: Boolean
});

var Tap = mongoose.model('Taps', tapSchema);

module.exports = { Tap }
