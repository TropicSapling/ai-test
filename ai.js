document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById("game");
  var game = canvas.getContext("2d");
  
  game.canvas.width  = window.innerWidth;
  game.canvas.height = window.innerHeight;
  
  game.fillText(canvas.width, 0, 0);
}, false);
