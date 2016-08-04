var config = require('./config');
var mongoose = require('mongoose');
var models = require('./server/models');

var uriString = `mongodb://${config.DB_URL}/${config.DB_NAME}`;

mongoose.connect(uriString, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uriString + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uriString);
  }
});

models.Tap.count({}).then((count, err) => {
  if (err) {
    console.error(err);
  } else if (count === 0) {
    console.log(`${count} taps found; inserting records...`);
    createTaps().then(() => {
      console.log('Taps created!')
      console.log('All done! Disconnecting.')
      mongoose.disconnect();
    });
  } else {
    console.log(`${count} taps found; skipping`);
    console.log('All done! Disconnecting.')
    mongoose.disconnect();
  }
});

function createTaps() {
  var taps = [];

  for (var i = 0; i < 4; i++) {
    taps.push(new models.Tap({
      location: '2 Canal - Beer Garden',
      handle: i,
      beer: {
        name: null,
        id: null
      }
    }));
  }

  for (var i = 0; i < 4; i++) {
    taps.push(new models.Tap({
      location: '2 Canal - Downstairs Kitchen',
      handle: i,
      beer: {
        name: null,
        id: null
      }
    }));
  }

  for (var i = 0; i < 6; i++) {
    taps.push(new models.Tap({
      location: 'Davenport - Benioff Kitchen',
      handle: i,
      beer: {
        name: null,
        id: null
      }
    }));
  }

  var promises = [];
  for (var t = 0; t < taps.length; t++) {
    promises.push(taps[t].save((err) => { if (err) console.log ('Error on save!') }));
  }

  return Promise.all(promises);
}
