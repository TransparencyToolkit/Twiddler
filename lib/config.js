'use strict'
var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var chalk = require('chalk')
var nconf = require('nconf')

function GetUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']
}

var Config = {}

Config.Init = function() {
  var config_path = GetUserHome() + '/.twiddler/'
  fs.exists(config_path + 'config.json', function(exists) {
    if (!exists) {
      mkdirp(config_path, function (err) {
        if (err) {
          console.error(err)
        } else {
          console.log(chalk.green('Created your config file at: ' + config_path + 'config.json'))
          Config.Save('shortcutKeys', ['ctrl', 'alt'])
          Config.Save('projects', [])
        }
      })
    } else {
      //console.log(chalk.blue('Loaded config file: ' + config_path + 'config.json'))
    }
  })
}

Config.Save = function(key, value) {
  nconf.file(GetUserHome() + '/.twiddler/config.json')
  nconf.set(key, value)
  nconf.save()
}

Config.Read = function(key) {
  nconf.file(GetUserHome() + '/.twiddler/config.json')
  nconf.load()
  return nconf.get(key)
}

Config.Home = GetUserHome()

module.exports = Config
