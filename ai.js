var x = 300;
var y = window.innerHeight - 325;
var objx = window.innerWidth;
var objy = window.innerHeight - 350;
var objdx = 100;
var objdy = 100;
var objMoving = false;
var speed = 1;
var jumping = false;
var falling = false;

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
    
    if(jumping && !falling) {
      if(y > window.innerHeight - 425) {
        y -= 10;
      } else {
        falling = true;
      }
    } else if(falling) {
      if(y < window.innerHeight - 325) {
        y += 10;
      } else {
        jumping = false;
        falling = false;
      }
    }
    
    game.fillRect(x, y, 75, 75); // AI
    
    if(objMoving) {
      objx -= speed * 4;
      game.fillRect(objx, objy, objdx, objdy);
    }
    
    speed = speed * 1.001;
  }, 40);
}, false);
