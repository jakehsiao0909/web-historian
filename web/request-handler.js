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
  } else if (req.method === 'POST') {
    var storage = '';

    req.on('data', function(chunk) {
      storage += chunk;
    });
    req.on('end', function() {
      var newUrl = storage.slice(4);

      archive.isUrlInList(newUrl, function(isInList) {
        if (isInList) {
          archive.isUrlArchived(newUrl, function(isArchived) {
            if (isArchived) {
              httpHelper.serveArchives(res, newUrl, 200);
            } else {
              httpHelper.serveAssets(res, 'loading.html', 302);
            }
          });
        } else {
          fs.appendFile(archive.paths.list, newUrl + '\n', function(error, callback) {
            if (error) { callback(error); }
            httpHelper.serveAssets(res, 'loading.html', 302);
          });
        }
      });
    });
  }
};
