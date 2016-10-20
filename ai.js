document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById("game");
  var game = canvas.getContext("2d");
  
  game.fillRect(0, game.height - 200, game.width, 200);
}, false);
