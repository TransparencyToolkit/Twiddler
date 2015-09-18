'use strict'
var _ = require('underscore')
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

Config.UpdateProjects = function(project) {

  nconf.file(GetUserHome() + '/.twiddler/config.json')
  nconf.load()

  var projects = nconf.get('projects')
  var find = _.findWhere(projects, { path: project.path })
  if (_.isEmpty(find)) {
    projects.push(project)
    console.log(projects)
    nconf.set('projects', projects)
    nconf.save()
  } else {

    console.log('oops, already added')
    console.log(project)
  }
}

Config.Home = GetUserHome()

module.exports = Config
