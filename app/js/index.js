var ipc = require('ipc')

var button = document.getElementById('start-progress')

button.onclick = function() {

  console.log('yayaya start-progress')

  var counter = 0

  // increment the progress value by 0.1 every second
  var progress = setInterval(function() {

    if (counter < 1) {
      ipc.send('update-progress', counter)
      counter += 0.1
    }
    else {
      // reset the progress value to 0;
      ipc.send('update-progress', 0)

      // clear out the set interval
      clearInterval(progress)

      // display a notification saying that we did everything
      new Notification('Progress Test Finished!');
    }
  }, 1000)

}


var button = document.getElementById('stop-progress')

button.onclick = function() {

  console.log('yayaya stop-progress')

  // reset the progress value to 0;
  ipc.send('update-progress', 'done-zo')

}
