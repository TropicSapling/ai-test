var x = 300;
var y = window.innerHeight - 325;
var objx = window.innerWidth;
var objy = window.innerHeight - (275 + Math.round(Math.random() * 50));
var objdx = 25 + (Math.round(Math.random() * 50));
var objdy = Math.abs(objy - window.innerHeight) - 250;
var speed = 1;
var jumping = false;
var falling = false;
var quickfalling = false;

var operations = ["+", "-", "*", "/", Math.PI, Math.E, objx, objy, objdx, objdy, speed, "Math.abs(", "Math.acos(", "Math.asin(", "Math.atan(", "Math.atan2(", "Math.ceil(", "Math.cos(", "Math.exp(", "Math.floor(", "Math.log(", "Math.max(", "Math.min(", "Math.pow(", "Math.random(", "Math.round(", "Math.sin(", "Math.sqrt(", "Math.tan(", "(", ")", ","];

function think() {
  var res_len = Math.round(Math.random() * 10) + 1;
  var opsToUse = [];
  for(i = 0; i < res_len; i++) {
    opsToUse.push(operations[Math.round(Math.random() * (operations.length - 1))]);
  }
  
  var res = eval(opsToUse.join(""));
  alert(opsToUse.join(""));
  
  return res;
}

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
    
    if(jumping && !falling) {
      if(y > window.innerHeight - 425) {
        y--;
      } else {
        falling = true;
      }
    } else if(falling) {
      if(y < window.innerHeight - 325) {
        y++;
      } else {
        jumping = false;
        falling = false;
      }
    }
    
    game.fillStyle = "#333";
    game.fillRect(x, y, 75, 75); // AI
    
    if(objx > 0) {
      objx -= speed;
    } else {
      objx = window.innerWidth;
      objdx = 25 + (Math.round(Math.random() * 50));
      objy = window.innerHeight - (275 + Math.round(Math.random() * 50));
      objdy = Math.abs(objy - window.innerHeight) - 250;
    }
    
    game.fillStyle = "black";
    game.fillRect(objx, objy, objdx, objdy); // Obstacle

    var action = think();
    if(action == 0) {
      jumping = true;
    } else if(action == 1) {
      quickFalling = true;
    }
    
    speed = speed * 1.00002;
  }, 4);
  
  document.getElementById("speed").addEventListener("change", function() {
    speed = document.getElementById("speed").value;
  }, false);
}, false);
