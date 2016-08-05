var Taps = require('./models').Taps;
var apicache = require('apicache').options({ debug: true }).middleware;
var fetch = require('node-fetch');
var config = require('../config');

module.exports.addEndpoints = function api(app) {
  app.get('/hello', function (req, res) {
    res.send(process.env.NODE_ENV);
  });

  app.get('/search-beer/:query', apicache('5 minutes'), function (req, res) {
    var query = req.params.query;
    fetch(`https://api.brewerydb.com/v2/search?key=${config.BREWERYDB_KEY}&type=beer&withBreweries=y&withLocations=y&q=${query}`).then((response) => {
      return response.json();
    }).then((response) => {
      res.send(response);
    });
  });

  app.get('/get-beer/:beerId', apicache('5 minutes'), function (req, res) {
    var id = req.params.beerId;
    fetch(`https://api.brewerydb.com/v2/beer/${id}?key=${config.BREWERYDB_KEY}&withBreweries=y`).then((response) => {
      return response.json();
    }).then((response) => {
      res.send(response);
    });
  });
}
