var x = 300;
var y = window.innerHeight - 325;
var objx = window.innerWidth;
var objy = window.innerHeight - (275 + Math.round(Math.random() * 50));
var objdx = 25 + (Math.round(Math.random() * 50));
var objdy = Math.abs(objy - window.innerHeight) - 250;
var speed = 0.005 * window.innerWidth;
var jumping = false;
var falling = false;

var operators = ["+", "-", "*", "/", "<", "<=", ">=", ">", "&&", "||"];
var vars = ["x", "y", "objx", "objy", "objdx", "objdy"];
var brackets = ["(", ")"];

var res_len = Math.round(Math.random() * 8) + 3;
while(res_len % 2 == 0) {
  res_len = Math.round(Math.random() * 8) + 3;
}
var genes = [];
var old_genes = [];
var old_genes_2nd = [];
var best_genes = [];
var best_genes_2nd = [];
var last_speed = speed;
var best_speed = speed;
var best_speed_2nd = speed;
var highscore = 0;
var op = 0;


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

function findVal(parenthesis) {
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
    res_len = Math.round(Math.random() * 8) + 3;
  } while(res_len % 2 == 0);
  genes = [];
  
  for(i = 0; i < res_len; i++) {
    var lastVal = findVal(parenthesis);
    if(lastVal == "(") {
      parenthesis++;
      op--;
    } else if(lastVal == ")") {
      parenthesis--;
      op--;
    }
    
    op++;
  }
  
  op = 0;
  
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
      res_len = Math.round(Math.random() * 8) + 3;
    } while(res_len % 2 == 0);
  } else {
    do {
      if(Math.max(old_genes.length, old_genes_2nd.length) == old_genes.length) {
        res_len = randomBetween(old_genes_2nd.length, old_genes.length);
      } else {
        res_len = randomBetween(old_genes.length, old_genes_2nd.length);
      }
    } while(res_len % 2 == 0 && !(old_genes.length == old_genes_2nd.length && old_genes.length % 2 == 0));
    
    if(old_genes.length == old_genes_2nd.length && old_genes.length % 2 == 0) {
      res_len = old_genes.length + 1;
    }
  }
  
  genes = [];
  
  for(i = 0; i < res_len; i++) {
    if(Math.round(Math.random() * 5) == 1) {
      var lastVal = findVal(parenthesis);
      if(lastVal == "(") {
        parenthesis++;
        op--;
      } else if(lastVal == ")") {
        parenthesis--;
        op--;
      }
    } else if(Math.round(Math.random()) == 0 && (($.isNumeric(old_genes[i]) && op % 2 == 0) || (operators.indexOf(old_genes[i]) != -1 && op % 2) || (vars.indexOf(old_genes[i]) != -1 && op % 2 == 0) || (old_genes[i] == "(" && op % 2) || (old_genes[i] == ")" && op % 2 == 0))) {
      genes.push(old_genes[i]);
      if(old_genes[i] == "(") {
        parenthesis++;
        op--;
      } else if(old_genes[i] == ")") {
        parenthesis++;
        op--;
      }
    } else if(($.isNumeric(old_genes_2nd[i]) && op % 2 == 0) || (operators.indexOf(old_genes_2nd[i]) != -1 && op % 2) || (vars.indexOf(old_genes_2nd[i]) != -1 && op % 2 == 0) || (old_genes_2nd[i] == "(" && op % 2) || (old_genes_2nd[i] == ")" && op % 2 == 0)) {
      genes.push(old_genes_2nd[i]);
      if(old_genes[i] == "(") {
        parenthesis++;
        op--;
      } else if(old_genes[i] == ")") {
        parenthesis++;
        op--;
      }
    } else {
      var lastVal = findVal(parenthesis);
      if(lastVal == "(") {
        parenthesis++;
        op--;
      } else if(lastVal == ")") {
        parenthesis--;
        op--;
      }
    }
    
    op++;
  }
  
  op = 0;
  
  while(parenthesis > 0) {
    genes.push(")");
    parenthesis--;
  }
}

generateGenes();

var gen = 0;
var child = 0;
var func;
var action;

function checkCond() {
  try {
    func = new Function("return " + genes.join(" "));
    action = func();
        
    if(action == true && speed == last_speed * 1.00002) {
      if(gen > 0) {
        mergeGenes();
      } else {
        generateGenes();
      }
      
      checkCond();
    }
    
    if(action == true) {
      jumping = true;
    }
  } catch(e) {
    if(gen > 0) {
      mergeGenes();
    } else {
      generateGenes();
    }
    
    checkCond();
  }
}

$(function() {
  var canvas = document.getElementById("game");
  var game = canvas.getContext("2d");
  
  canvas.setAttribute("width", window.innerWidth);
  canvas.setAttribute("height", window.innerHeight);
  
  interval(function() {
    game.clearRect(0, 0, window.innerWidth, window.innerHeight);
    game.font = "24px Arial";
    game.fillText("Generation: " + (gen + 1), 16, 32);
    game.fillText("Child: " + (child + 1), 16, 56);
    game.font = "18px Arial";
    game.fillText("Highscore: " + highscore, 16, 104);
    game.fillText(genes.join(" "), 256, 32);
    
    game.fillRect(0, window.innerHeight - 250, window.innerWidth, 250); // Ground
    
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
      if((speed > best_speed || (speed == best_speed && genes.length < best_genes.length)) && speed > last_speed * Math.pow(1.00002, (window.innerWidth - 300) / last_speed)) {
        gen++;
        child = 0;
        best_speed = speed;
        highscore = Math.round(speed * 10000) - last_speed * 10000;
        speed = last_speed;
        best_genes = genes;
        old_genes = best_genes;
        old_genes_2nd = best_genes_2nd;
      } else {
        if(speed > best_speed) {
          best_genes = genes;
          best_speed = speed;
          highscore = Math.round(speed * 10000) - last_speed * 10000;
        } else if(speed > best_speed_2nd) {
          best_genes_2nd = genes;
          best_speed_2nd = speed;
        } else if(speed == best_speed && genes.length < best_genes.length) {
          best_genes = genes;
        } else if(speed == best_speed_2nd && genes.length < best_genes_2nd.length) {
          best_genes_2nd = genes;
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

    if(speed > best_speed) {
      highscore = Math.round(speed * 10000) - last_speed * 10000;
    }
    
    speed = speed * 1.00002;
    
    checkCond();
    
    if(jumping && !falling) {
      if(y > window.innerHeight - 425) {
        y -= Math.ceil((y - (window.innerHeight - 425)) * speed) / 50;
      } else {
        y = window.innerHeight - 424;
        falling = true;
      }
    } else if(falling) {
      if(y < window.innerHeight - 325) {
        y += Math.ceil((y - (window.innerHeight - 425)) * speed) / 50;
      } else {
        y = window.innerHeight - 325;
        jumping = false;
        falling = false;
      }
    }
  }, 0);
  
  document.getElementById("speed").addEventListener("change", function() {
    speed = ($("#speed").val() / 1000) * window.innerWidth;
    last_speed = speed;
  }, false);
});
