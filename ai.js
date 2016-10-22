var x = 300;
var y = window.innerHeight - 325;
var objx = window.innerWidth;
var objy = window.innerHeight - (275 + Math.round(Math.random() * 50));
var objdx = 25 + (Math.round(Math.random() * 50));
var objdy = Math.abs(objy - window.innerHeight) - 250;
var speed = 1;
var jumping = false;
var falling = false;
var quickFalling = false;

var operations = ["+", "-", "*", "/", Math.PI, Math.E, objx, objy, objdx, objdy, speed, "Math.abs(", "Math.acos(", "Math.asin(", "Math.atan(", "Math.atan2(", "Math.ceil(", "Math.cos(", "Math.exp(", "Math.floor(", "Math.log(", "Math.max(", "Math.min(", "Math.pow(", "Math.random(", "Math.round(", "Math.sin(", "Math.sqrt(", "Math.tan(", "(", ")", ","];

var res_len = Math.round(Math.random() * 10) + 1;
var genes = [];
var lastOp = -1;

function findOp() {
  var randOp = Math.round(Math.random() * (operations.length - 1));
  if(randOp == lastOp || (randOp < 4 && (lastOp < 4 || (lastOp > 10 && lastOp < 30) || lastOp == 32))) {
    lastOp = randOp;
    findOp();
  } else {
    genes.push(operations[randOp]);
    lastOp = randOp;
  }
}

function generateGenes() {
  genes = [];
  
  var paranthesis = 0;
  
  for(i = 0; i < res_len; i++) {
    findOp();
    if(lastOp > 10 && lastOp < 30) {
      paranthesis++;
    } else if(lastOp == 30) {
      paranthesis--;
    }
  }
  
  while(paranthesis) {
    genes.push(")");
    paranthesis--;
  }
  
  alert(genes.join(""));
}

generateGenes();

var gen = 0;
var child = 0;

$(function() {
  var canvas = document.getElementById("game");
  var game = canvas.getContext("2d");
  
  canvas.setAttribute("width", window.innerWidth);
  canvas.setAttribute("height", window.innerHeight);
  
  setInterval(function() {
    game.clearRect(0, 0, window.innerWidth, window.innerHeight);
    game.font = "24px Arial";
    game.fillText("Generation: " + (gen + 1), 16, 32);
    game.fillText("Child: " + (child + 1), 16, 56);
    
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
    
    if((objx + objdx) >= x && objx <= x + 75 && (objy + objdy) >= y && objy <= y + 75) {
      // Touching obstacle
      child++;
      objx = window.innerWidth;
      objdx = 25 + (Math.round(Math.random() * 50));
      objy = window.innerHeight - (275 + Math.round(Math.random() * 50));
      objdy = Math.abs(objy - window.innerHeight) - 250;
    }
    
    speed = speed * 1.00002;
    $('#speed').val(speed);
  }, 4);
  
  setInterval(function() {
    try {
      var action = new Function("return" + genes.join("")));
      
      if(action == 1) {
        jumping = true;
      } else if(action == 0) {
        quickFalling = true;
      }
    } catch(e) {
      generateGenes();
    }
  }, 40);
  
  document.getElementById("speed").addEventListener("change", function() {
    speed = $("#speed").val();
  }, false);
});
