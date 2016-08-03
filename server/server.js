var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('../webpack.config');

var app = express();
var compiler = webpack(config);

var DEBUG = process.env.DEBUG == 'true';

if (DEBUG) {
  // DEV -------------------------------------------------
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    historyApiFallback: true
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.listen(3000, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log('Listening at localhost:3000');
  });
} else {
  // PRODUCTION -----------------------------------------
  app.get('/hello', function (req, res) {
    res.send('Hello World!');
  });

  app.use(express.static('dist'));

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
}
