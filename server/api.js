var Tap = require('./models').Tap;
var mongoose = require('mongoose');
var apicache = require('apicache').options({ debug: true }).middleware;
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var config = require('../config');

module.exports.addEndpoints = function api(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/search-beer/:query', apicache('6 hours'), function (req, res) {
    var query = req.params.query;
    fetch(`https://api.brewerydb.com/v2/search?key=${config.BREWERYDB_KEY}&type=beer&withBreweries=y&withLocations=y&q=${query}`).then((response) => {
      return response.json();
    }).then((response) => {
      res.send(response);
    });
  });

  app.get('/get-beer/:beerId', apicache('6 hours'), function (req, res) {
    var id = req.params.beerId;
    fetch(`https://api.brewerydb.com/v2/beer/${id}?key=${config.BREWERYDB_KEY}&withBreweries=y`).then((response) => {
      return response.json();
    }).then((response) => {
      res.send(response);
    });
  });

  app.get('/taps', function (req, res) {
    mongoose.connect(config.MONGODB_URI, function (err) {
      if (err) {
        console.error(err);
        res.status(500);
        res.send('Error connecting to database');
        return;
      }
    });

    Tap.where({}).then((result, err) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(result || err));
      mongoose.disconnect();
    });
  });

  app.post('/replace-beer/:building/:room/:handle/', function (req, res) {
    mongoose.connect(config.MONGODB_URI, function (err) {
      if (err) {
        console.error(err);
        res.status(500);
        res.send('Error connecting to database');
        return;
      }
    });

    const location = {
      building: req.params.building,
      room: req.params.room,
      handle: parseInt(req.params.handle)
    };

    Tap.findOneAndUpdate({location}, {beer: req.body}, {runValidators: true}).exec().then(function (result, err) {
      if (err) {
        console.error(err);
        res.status(500);
        res.send('Error updating model');
      } else {
        res.send('Success');
      }
      mongoose.disconnect();
    });
  });
}
