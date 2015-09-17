'use strict'
var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var chalk = require('chalk')
var nconf = require('nconf').file({
  file: GetUserHome() + '/.twiddler/config.json'
})

function Init() {
  var config_path = GetUserHome() + '/.twiddler/'
  fs.exists(config_path + 'config.json', function(exists) {
    if (!exists) {
      mkdirp(config_path, function (err) {
        if (err) {
          console.error(err)
        } else {
          console.log(chalk.green('created config file: ' + config_path + 'config.json'))
          Save('shortcutKeys', ['ctrl', 'alt'])
          Save('projects', [])
        }
      })
    } else {
      console.log(chalk.blue('loaded config file: ' + config_path + 'config.json'))
    }
  })
}

function Save(key, value) {
  nconf.set(key, value)
  nconf.save()
}

function Read(key) {
  nconf.load();
  return nconf.get(key)
}

function GetUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']
}

module.exports = {
  Init: Init,
  Save: Save,
  Read: Read
}
