document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById("game");
  var game = canvas.getContext("2d");
  
  canvas.setAttribute("width", window.innerWidth);
  canvas.setAttribute("height", window.innerHeight);
  
  game.font = "24px Arial";
  game.fillText("Generation: 1", 16, 32);
  game.fillText("Child: 1", 16, 56);
  
  game.fillRect(0, window.innerHeight - 300, window.innerWidth, 300); // Ground

  game.fillStyle = "#333";
  game.fillRect(300, window.innerHeight - 400, 100, 100); // AI
  
  startGame();
}, false);

function startGame() {
  // WIP
}
