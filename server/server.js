var express = require('express');
var app = express();
var api  = require('./api');

// API endpoints ----------------------------------------
api.addEndpoints(app);

// PRODUCTION -----------------------------------------
app.use(express.static('dist'));

app.listen(process.env.PORT || 3000, '0.0.0.0', function () {
  console.log('Example app listening on port ' + (process.env.PORT || 3000));
});
