'use strict'
const app = require('app')
const BrowserWindow = require('browser-window')
const ipc = require('ipc')

// report crashes to the Electron project
require('crash-reporter').start()

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')()


var Config = require('./lib/config')


// prevent window being GC'd
let mainWindow

function createMainWindow() {
	const newWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		resizable: true
	})

	newWindow.loadUrl(`file://${__dirname}/app/index.html`)
	newWindow.on('closed', onClosed)

	return newWindow
}

function onClosed() {
	// deref the window
	// for multiple windows store them in an array
	mainWindow = null
}

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate-with-no-open-windows', function () {
	if (!mainWindow) {
		mainWindow = createMainWindow()
	}
})

app.on('ready', function () {

	Config.Init()

	// Launch App
	mainWindow = createMainWindow()

	// DEBUG: Open the devtools
  // mainWindow.openDevTools();

	// Emitted when window is closed
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });


	// if the current platform is windows...
  if (process.platform === 'win32') {

    var counter = 0
    // every 1 second, increment the progress bar value
    var progress = setInterval(function() {
      if (counter < 1) {
        mainWindow.setProgressBar(counter)
        counter += .1
      }
      else {
        mainWindow.setProgressBar(0)
        clearInterval(progress)
      }
    }, 1000)
  }

})



// respond to the 'progress' event
ipc.on('update-progress', function(event, arg) {

	console.log('yo dawg update-progress counter: ' + arg)

  if (process.platform === 'win32') {
    mainWindow.setProgressBar(arg)
  }

})
