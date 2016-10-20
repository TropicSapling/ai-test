document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById("game");
  var game = canvas.getContext("2d");
  
  game.fillRect(0, canvas.height - 200, canvas.width, 200);

  game.fillText("Height:" canvas.height, 0, 200);
}, false);
