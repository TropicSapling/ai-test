document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById("game");
  var game = canvas.getContext("2d");
  
  game.fillRect(0, canvas.scrollHeight - 200, canvas.scrollWidth, 200);
}, false);
