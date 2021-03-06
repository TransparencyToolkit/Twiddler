var Promise = require('es6-promise').Promise
var fs = require('fs')
var pkg = require('package')('./')
var path = require('path')
var _ = require('underscore')
var chalk = require('chalk')
var slugs = require('slugs')
var dpInit = require('datapackage-init')
var dpRead = require('datapackage-read')
var dpIdentifier = require('datapackage-identifier')
var dpValidate = require('datapackage-validate')
var nconf = require('nconf')

var Files = require('./files')
var Hasher = require('./hasher')
var Templates = require('./templates')

var Project = {}

// Open Job
Project.Open = function(project) {

  // Check for custom project-name.json
  if (project.indexOf('.json') > -1) {
    var project_path = project
  } else {
    var project_path = project + 'twiddler.json'
  }

  // Load Project
  nconf.file(project_path)
  nconf.load()

  // Check Version
  if (pkg.version >= nconf.get('version')) {

    var project = nconf.get()
    var project_keys = _.keys(project)
    var template_keys = _.keys(Templates.project_new)

    // Validate Schema
    if (project_keys.join('_') === template_keys.join('_')) {
      return project
    } else {
      // TODO: make this more uniform structured output
      console.log(chalk.red('Dang, that project config file is invalid'))
      return 'invalid'
    }
  } else if (pkg.version < nconf.get('version')) {
    console.log(chalk.yellow('Your Twiddler is outdated, please upgrade'))
    return 'outdated'
  } else {
    return 'none'
  }
}

Project.New = function(project_path, project_title, project_data, overwrite) {
  return new Promise(function(resolve, reject) {
    fs.exists(project_path + 'twiddler.json', function(exists) {
      if (!exists || overwrite) {

        // Save Path
        nconf.file(project_path + 'twiddler.json')

        // Default Settings
        _.each(Templates.project_new, function(item, name) {
          nconf.set(name, item)
        })

        // Set Name & Title
        var project_name = slugs(project_title)
        nconf.set('name', project_name)
        nconf.set('title', project_title)

        // If Extra Values Exist
        if (project_data) {
          _.each(project_data, function(item, name) {
            nconf.set(name, item)
          })
        }

        nconf.save()
        resolve('project created')

      } else {
        reject('project exists')
      }
    })
  })
}

Project.AddSourceFile = function(project, source) {
  Hasher.GetFromFile(source).then(function(hash) {

    // Load Project
    nconf.file(project + 'twiddler.json')
    nconf.load()

    // Build Sources
    var sources = nconf.get('sources')
    var check_exists = _.findWhere(sources, { hash: hash })

    // Does Not Exist, Add
    if (!check_exists) {

      var new_source = Templates.project_source_new
      new_source.source = source
      new_source.type = 'file'
      new_source.hash = hash
      sources.push(new_source)

      nconf.set('sources', sources)
      nconf.save()

    } else {
      console.log('ooops hash already exists: ' + hash)
    }
  })
}

Project.RemoveSource = function(project, source) {
  nconf.file(project + 'twiddler.json')
  nconf.load()

  var sources = nconf.get('sources')
  var sources_new = []

  _.each(sources, function(source_item, key) {
    if (source_item.source != source) {
      sources_new.push(source_item)
    }
  })

  nconf.set('sources', sources_new)
  nconf.save()
}

module.exports = Project
