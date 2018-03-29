var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var Promise = require('bluebird');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(error, files) {
    if (error) { callback(error); }
    var list = String(files).split('\n');
    callback(list);
  });
};
// exports.readListOfUrls = function() {
//   return new Promise(function(resolve, reject) {
//     fs.readFile(exports.paths.list, function(error, files) {
//       if (error) { reject(error); }
//       var list = String(files).split('\n');      
//       resolve(list);
//     });
//   });
// };

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, function(error, files) {
    if (error) { callback(error); }
    if (String(files).indexOf(url) >= 0) {
      callback(true);
    } else {
      callback(false);
    }
  });
};
// exports.isUrlInList = function(url) {
//   return new Promise(function(resolve, reject) {
//     fs.readFile(exports.paths.list, function(error, files) {
//       if (error) { reject(error); }
//       if (String(files).indexOf(url) >= 0) {
//         resolve(true);
//       } else {
//         resolve(false);
//       }
//     });
//   });    
// };


exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function(error, files) {
    if (error) { callback(error); }
    callback(files);
  })
};
// exports.addUrlToList = function(url) {
//   return new Promise(function(resolve, reject) {
//     fs.appendFile(exports.paths.list, url + '\n', function(error, files) {
//       if (error) { reject(error); }
//       resolve(files);
//     });
//   });
// };

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(error, files) {
    callback(files.indexOf(url) >= 0);
  });
};
// exports.isUrlArchived = function(url) {
//   return new Promise(function(resolve, reject) {
//     fs.readdir(exports.paths.archivedSites, function(error, files) {
//       callback(files.indexOf(url) >= 0);
//     });
//   });    
// };

exports.downloadUrls = function(urls) {
  for (var i = 0; i < urls.length; i++) {
    fs.writeFile(exports.paths.archivedSites + '/' + urls[i]);
  }
};
