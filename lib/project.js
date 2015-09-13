var Promise = require('es6-promise').Promise
var fs = require('fs')
var pkg = require('package')('./')
var path = require('path')
var _ = require('underscore')
var chalk = require('chalk')
var dpInit = require('datapackage-init')
var dpRead = require('datapackage-read')
var dpIdentifier = require('datapackage-identifier')
var dpValidate = require('datapackage-validate')

var Files = require('./files')
var Templates = require('./templates')

var Project = {}

// Open Job
Project.Open = function(project_path) {
  return new Promise(function(resolve, reject) {
    fs.exists(project_path, function(exists) {
      if (exists) {
        fs.stat(project_path, function(error, stats) {
          fs.open(project_path, "r", function(error, fd) {
            if (error) {
              reject(Error(error))
            }
            var buffer = new Buffer(stats.size)
            fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
              fs.close(fd)
              var data = buffer.toString("utf8", 0, buffer.length)
              var json = JSON.parse(data)
              if (pkg.version >= json.version) {
                resolve(data)
              } else {
                resolve({ 'status': 'error', 'message': 'Could not open project. Your version of Twiddler is too old, please upgrade' })
              }
            })
          })
        })
      } else {
        reject(Error('awwww no such file'))
      }
    })
  })
}

Project.Save = function() {
// Use Templates.project_new
}

Project.AddSource = function() {
// 1. Check if URL or file
// 2. Analyze if already a datapackage
// 3. Get hash of data
// 4. Use Templates.project_source_new
}

Project.RemoveSource = function() {
//
}

module.exports = Project
