var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
var httpHelper = require('./http-helpers');



exports.handleRequest = function (req, res) {
  var address = url.parse(req.url).pathname;

  var noSlash = address.replace('/', '');
  if (req.method === 'GET') {
    if (address === '/') {
      httpHelper.serveAssets(res, 'index.html', 200);
    } else {
      archive.isUrlArchived(noSlash, function(isUrl) {
        if (isUrl) {
          httpHelper.serveArchives(res, noSlash, 200);
        } else {
          res.writeHead(404, httpHelper.headers);
          res.end('');
        }
      });
    }
  } else if (req.methos === 'POST') {
    var storage = [];

  }
};
