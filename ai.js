document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById("game");
  var game = canvas.getContext("2d");
  
  canvas.setAttribute("width", window.innerWidth);
  canvas.setAttribute("height", window.innerHeight);
  
  game.fillRect(0, window.innerHeight - 300, window.innerWidth, 300);
}, false);
