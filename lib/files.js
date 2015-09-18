var Promise = require('es6-promise').Promise
var _  = require('underscore')
var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')

var Utils = require('./utils')

Files = {
  ignore_list: [
    'twiddler.json',
    'datapackage.json'
  ]
}

Files.OpenFile = function(file_path) {
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

Files.Walk = function(current_path, callback) {
   fs.readdirSync(current_path).forEach(function(name) {
     if (!Utils.IsHidden(name) && (_.indexOf(Files.ignore_list, name) === -1)) {

       var file_path = path.join(current_path, name)
       var stat = fs.statSync(file_path)

       if (stat.isFile()) {
           callback(file_path, stat)
       } else if (stat.isDirectory()) {
           Files.Walk(file_path, callback)
       }

     }
   })
 }

module.exports = Files
