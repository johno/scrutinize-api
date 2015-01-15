var express = require('express');
var app = express();

var isUrl = require('is-url');
var normalizeUrl = require('normalize-url');
var scrutinize = require('scrutinize');

app.get('/', function(req, res) {
  var url = normalizeUrl(req.param('url') || '');
  res.type('application/json');

  if (isUrl(url)) {
    scrutinize(req.param('url'), {}, function(data) {
      res.send(JSON.stringify(data));
    });
  } else {
    res.status(406)
    res.send(JSON.stringify({
      error: 'No valid url specified',
      example: 'http://api.scrutinize.io?url=example.com'
    }));
  }
});

app.listen(process.env.PORT || 3030); // Deltron
