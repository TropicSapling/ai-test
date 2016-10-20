document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById("game");
  var game = canvas.getContext("2d");
  
  game.fillRect(0, canvas.height - 200, canvas.width, canvas.height);
}, false);
