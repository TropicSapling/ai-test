var x = 300;
var y = window.innerHeight - 325;
var jumping = false;

document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById("game");
  var game = canvas.getContext("2d");
  
  canvas.setAttribute("width", window.innerWidth);
  canvas.setAttribute("height", window.innerHeight);
  
  setInterval(function() {
    game.clearRect(0, 0, window.innerWidth, window.innerHeight);
    game.font = "24px Arial";
    game.fillText("Generation: 1", 16, 32);
    game.fillText("Child: 1", 16, 56);
    
    game.fillRect(0, window.innerHeight - 250, window.innerWidth, 250); // Ground
    
    game.fillStyle = "#333";
    game.fillRect(x, y, 75, 75); // AI
  }, 40);
  
  setInterval(jump, 1000);
}, false);

function jump() {
  if(!jumping) {
    jumping = true;
    
    for(i = 0; i < 10; i++) {
      setTimeout(function() {
        y--;
      }, 5);
    }
    
    for(i = 0; i < 10; i++) {
      setTimeout(function() {
        y++;
      }, 5);
    }
    
    jumping = false;
  }
}
