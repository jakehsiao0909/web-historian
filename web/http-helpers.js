var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 6000, // Seconds.
  'Content-Type': 'text/html'
};

exports.headers = headers;

exports.serveAssets = function(res, asset, statusCode, callback) {
  fs.readFile(archive.paths.siteAssets + '/' + asset, function(error, data) {
    if (error) { callback(error) };
    res.writeHead(statusCode, headers);
    res.end(String(data));
  })
};


exports.serveArchives = function(res, url, statusCode, callback) {
  fs.readFile(archive.paths.archivedSites + '/' + url, function(error, data) {
    if (error) { callback(error) };
    res.writeHead(statusCode, headers);
    res.end(String(data));
  })
};




// As you progress, keep thinking about what helper functions you can put here!
