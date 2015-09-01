var Promise = require('es6-promise').Promise
var fs = require("fs")
var _  = require('underscore')
var mkdirp = require('mkdirp')

Files = {}

Files.OpenFile = function(file_path) {
  // A generic function for reading a file
  // It returns a promise, which rejects with an error
  // or returns the Buffer of the loaded file at file_path
  return new Promise(function(resolve, reject) {
    fs.exists(file_path, function(exists) {
      if (exists) {
        fs.stat(file_path, function(error, stats) {
          fs.open(file_path, "r", function(error, fd) {
            if (error) {
              reject(Error(error))
            }
            var buffer = new Buffer(stats.size)
            fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
              fs.close(fd)
              var data = buffer.toString("utf8", 0, buffer.length)
              // TODO: Add support for parsing different file types automatical
              // var schema = JSON.parse(json);
              resolve(data)
            });
          });
        });
      } else {
        reject(Error('awwww no such file'))
      }
    })
  })
}

Files.SaveFile = function(path, filename, data, callback) {
  mkdirp(path, function (err) {
    if (err) {
      console.error(err)
    } else {
      fs.writeFile(path + filename, data, function (err) {
        if (err) {
          return console.log(err)
        } else {
          callback(filename)
        }
      })
    }
  })
}

module.exports = Files
