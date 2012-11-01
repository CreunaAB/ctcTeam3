
var sp = getSpotifyApi(1), // Getthe spotify api
    models = sp.require('sp://import/scripts/api/models'); // Get models

// Listen to the eventlisteners indicating change of tab
models.application.observe(models.EVENT.ARGUMENTSCHANGED, function (e) {
  var b = document.getElementById('head'), // Get the 'bodu' element (<head>)
      arg = models.application.arguments[0]; // Get the values of the tabs

  // Change class on the head-element
  switch (arg) {
    case 'Blue':
      b.setAttribute('class', 'bg1');
      break;
    case 'Red':
      b.setAttribute('class', 'bg2');
      break;
    case 'Green':
      b.setAttribute('class', 'bg3');
      break;
    default:
      console.log('error:: undefined tab');
      break;
    }
});
