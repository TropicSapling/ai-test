document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById("game");
  var game = canvas.getContext("2d");
  
  canvas.setAttribute("width", window.innerWidth);
  canvas.setAttribute("height", window.innerHeight);
  
  game.fillText("Generation: 1\nChild: 1", 0, 0);
  
  game.fillRect(0, window.innerHeight - 300, window.innerWidth, 300); // Ground

  game.fillStyle = "#333";
  game.fillRect(100, window.innerHeight - 400, 100, 100); // AI
}, false);
