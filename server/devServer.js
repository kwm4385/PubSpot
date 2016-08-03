var path = require('path');
var express = require('express');
var config = require('../webpack.config');
var app = express();

var webpack = require('webpack');
var compiler = webpack(config);

var api  = require('./api');

// API endpoints ----------------------------------------
api(app);

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
