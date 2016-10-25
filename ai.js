var x = 300;
var y = window.innerHeight - 325;
var objx = window.innerWidth;
var objy = window.innerHeight - (275 + Math.round(Math.random() * 50));
var objdx = 25 + (Math.round(Math.random() * 50));
var objdy = Math.abs(objy - window.innerHeight) - 250;
var speed = 5;
var jumping = false;
var falling = false;

var operators = ["+", "-", "*", "/", "<", "<=", ">=", ">", "&&", "||"];
var vars = ["x", "y", "objx", "objy", "objdx", "objdy", "speed"];
var brackets = ["(", ")"];

var res_len = Math.round(Math.random() * 11) + 1;
while(res_len % 2 == 0) {
  res_len = Math.round(Math.random() * 11) + 1;
}
var genes = [];
var old_genes = [];
var old_genes_2nd = [];
var last_speed = 5;
var best_speed = 5;
var best_speed_2nd = 5;


function interval(func, wait, times){
  var interv = function(w, t){
    return function(){
      if(typeof t === "undefined" || t-- > 0){
        setTimeout(interv, w);
        try {
          func.call(null);
        } catch(e){
          t = 0;
          throw e.toString();
        }
      }
    };
  }(wait, times);
  
  setTimeout(interv, wait);
};

function findVal(parenthesis, op) {
  var randBracket = Math.round(Math.random());
  
  if(op % 2) {
    var randOp = Math.round(Math.random() * (operators.length - 1));
    if(parenthesis > 0 && randBracket == brackets.indexOf(")") && Math.round(Math.random())) {
      genes.push(brackets[randBracket]);
      return brackets[randBracket];
    } else {
      genes.push(operators[randOp]);
      return operators[randOp];
    }
  } else {
    var randVar = Math.round(Math.random() * (vars.length - 1));
    
    if(randBracket == brackets.indexOf("(") && Math.round(Math.random())) {
      genes.push(brackets[randBracket]);
      return brackets[randBracket];
    } else {
      if(Math.round(Math.random())) {
        randVar = Math.round(Math.random() * 100)
        genes.push(randVar);
        return randVar;
      } else {
        genes.push(vars[randVar]);
        return vars[randVar];
      }
    }
  }
}

function generateGenes() {
  var parenthesis = 0;
  do {
    res_len = Math.round(Math.random() * 11) + 1;
  } while(res_len % 2 == 0);
  genes = [];
  
  for(i = 0; i < res_len; i++) {
    var lastVal = findVal(parenthesis, i);
    if(lastVal == "(") {
      parenthesis++;
      i--;
    } else if(lastVal == ")") {
      parenthesis--;
      i--;
    }
  }
  
  while(parenthesis > 0) {
    genes.push(")");
    parenthesis--;
  }
}

function randomBetween(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function mergeGenes() {
  var parenthesis = 0;
  
  if(Math.round(Math.random() * 5) == 1) {
    do {
      res_len = Math.round(Math.random() * 11) + 1;
    } while(res_len % 2 == 0);
  } else {
    do {
      if(Math.max(old_genes.length, old_genes_2nd.length) == old_genes.length) {
        res_len = randomBetween(old_genes.length, old_genes_2nd.length);
      } else {
        res_len = randomBetween(old_genes_2nd.length, old_genes.length);
      }
    } while(res_len % 2 == 0);
  }
  
  genes = [];
  
  for(i = 0; i < res_len; i++) {
    if(Math.round(Math.random() * 5) == 1) {
      var lastVal = findVal(parenthesis, i);
      if(lastVal == "(") {
        parenthesis++;
        i--;
      } else if(lastVal == ")") {
        parenthesis--;
        i--;
      }
    } else if(Math.round(Math.random()) == 0 && (($.isNumeric(old_genes[i]) && i % 2 == 0) || (operators.indexOf(old_genes[i]) != -1 && i % 2) || (vars.indexOf(old_genes[i]) != -1 && i % 2 == 0) || (old_genes[i] == "(" && i % 2) || (old_genes[i] == ")" && i % 2 == 0))) {
      genes.push(old_genes[i]);
      if(old_genes[i] == "(") {
        parenthesis++;
        i--;
      } else if(old_genes[i] == ")") {
        parenthesis++;
        i--;
      }
    } else if(($.isNumeric(old_genes_2nd[i]) && i % 2 == 0) || (operators.indexOf(old_genes_2nd[i]) != -1 && i % 2) || (vars.indexOf(old_genes_2nd[i]) != -1 && i % 2 == 0) || (old_genes_2nd[i] == "(" && i % 2) || (old_genes_2nd[i] == ")" && i % 2 == 0)) {
      genes.push(old_genes_2nd[i]);
      if(old_genes[i] == "(") {
        parenthesis++;
        i--;
      } else if(old_genes[i] == ")") {
        parenthesis++;
        i--;
      }
    } else {
      var lastVal = findVal(parenthesis, i);
      if(lastVal == "(") {
        parenthesis++;
        i--;
      } else if(lastVal == ")") {
        parenthesis--;
        i--;
      }
    }
  }
  
  while(parenthesis > 0) {
    genes.push(")");
    parenthesis--;
  }
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
    game.font = "18px Arial";
    game.fillText(genes.join(" "), 256, 32);
    
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
      if(child > 24) {
        gen++;
        child = 0;
        speed = last_speed;
      } else {
        if(speed > best_speed) {
          old_genes = genes;
          best_speed = speed;
        } else if(speed > best_speed_2nd) {
          old_genes_2nd = genes;
          best_speed_2nd = speed;
        }
        
        child++;
        speed = last_speed;
      }
      
      if(gen > 0) {
        mergeGenes();
      } else {
        generateGenes();
      }
      
      objx = window.innerWidth;
      objdx = 25 + (Math.round(Math.random() * 50));
      objy = window.innerHeight - (275 + Math.round(Math.random() * 50));
      objdy = Math.abs(objy - window.innerHeight) - 250;
    }
    
    speed = speed * 1.00002;
  }, 4);
  
  setInterval(function() {
    try {
      var func = new Function("return " + genes.join(" "));
      var action = func();
      
      if(action == true) {
        jumping = true;
      }
    } catch(e) {
      if(gen > 0) {
        mergeGenes();
      } else {
        generateGenes();
      }
    }
  }, 40);
  
  document.getElementById("speed").addEventListener("change", function() {
    speed = $("#speed").val();
    last_speed = speed;
  }, false);
});
