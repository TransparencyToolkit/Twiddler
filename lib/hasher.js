var Promise = require('es6-promise').Promise
var crypto = require('crypto')
var fs = require('fs')

var Files = require('./files')

var Hasher = {}

Hasher.GetFromFile = function(file_path) {
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

              // TODO: add support for other hash types
              var sha1sum = crypto.createHash('sha1')
              sha1sum.update(buffer)
              var hash = sha1sum.digest('hex')

              resolve(hash)
            })
          })
        })
      } else {
        reject(Error('awwww no such file'))
      }
    })
  })
}

Hasher.GetFromString = function(string) {
  // TODO: add support for other hash types
  var sha1sum = crypto.createHash('sha1')
  sha1sum.update(string)
  var hash = sha1sum.digest('hex')
  return hash
}

module.exports = Hasher
