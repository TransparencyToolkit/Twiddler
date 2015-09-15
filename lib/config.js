'use strict'

var path = require('path')
var mkdirp = require('mkdirp')
var nconf = require('nconf').file({
  file: getUserHome() + '/.twiddler/config.json'
})

function initConfig() {

  mkdirp(getUserHome() + '/.twiddler/', function (err) {
    if (err) {
      console.error(err)
    } else {
      console.log('making config folder')
      saveSettings('shortcutKeys', ['ctrl', 'shift']);
      saveSettings('projects', []);
    }
  })

}

function saveSettings(settingKey, settingValue) {
  nconf.set(settingKey, settingValue)
  nconf.save()
}

function readSettings(settingKey) {
  nconf.load();
  return nconf.get(settingKey)
}

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']
}

module.exports = {
  initConfig: initConfig,
  saveSettings: saveSettings,
  readSettings: readSettings
}
