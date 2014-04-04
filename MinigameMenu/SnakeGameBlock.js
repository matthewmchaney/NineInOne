//BlankGame.js is an empty template for a new game. Example2Game.js directly worked off of this file to show how it works. 
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

game = {
  
  score: 0,
  time: 60,
  fps: 8,
  over: false,
  message: null,
  
  start: function() {
    game.over = false;
    game.message = null;
    game.score = 0;
	game.time = 60;
    game.fps = 8;
    snake.init();
    food.set();
  },
  
  stop: function() {
    game.over = true;
    //game.message = 'GAME OVER'; //- PRESS SPACEBAR';
	game.start();
  },
  
  drawBox: function(x, y, size, color) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x - (size / 2), y - (size / 2));
    context.lineTo(x + (size / 2), y - (size / 2));
    context.lineTo(x + (size / 2), y + (size / 2));
    context.lineTo(x - (size / 2), y + (size / 2));
    context.closePath();
    context.fill();
  },
  
  drawScore: function(canvasX, canvasY) {
    context.fillStyle = '#999';
    context.font = (/*canvas*/BaseSquare.SquareHeight) + 'px Impact, sans-serif';
    context.textAlign = 'center';
    context.fillText(game.time, /*canvas*/(BaseSquare.SquareWidth/2)+canvasX, /*canvas*/(BaseSquare.SquareHeight  * .9)+canvasY);
  },
  
  drawMessage: function(canvasX, canvasY) {
    if (game.message !== null) {
      context.fillStyle = '#00F';
      context.strokeStyle = '#FFF';
      context.font = (/*canvas*/BaseSquare.SquareHeight / 10) + 'px Impact';
      context.textAlign = 'center';
      context.fillText(game.message, /*canvas*/(BaseSquare.SquareWidth/2)+canvasX, /*canvas*/(BaseSquare.SquareHeight/2)+canvasY);
      context.strokeText(game.message, /*canvas*/BaseSquare.SquareWidth/2, /*canvas*/BaseSquare.SquareHeight/2);
    }
  },
  
  resetCanvas: function() {
    context.clearRect(0, 0, /*canvas*/BaseSquare.SquareWidth, /*canvas*/BaseSquare.SquareHeight);
  }
  
};

snake = {
  
  size: /*canvas*/BaseSquare.SquareWidth / 40,
  x: null,
  y: null,
  color: '#0F0',
  direction: 'left',
  sections: [],
  
  init: function() {
    snake.sections = [];
    snake.direction = 'left';
    snake.x = /*canvas*/BaseSquare.SquareWidth / 2 + snake.size / 2;
    snake.y = /*canvas*/BaseSquare.SquareHeight /2 + snake.size / 2;
    for (i = snake.x + (5 * snake.size); i >= snake.x; i-=snake.size) {
      snake.sections.push(i + ',' + snake.y); 
    }
  },
  
  move: function() {
    switch(snake.direction) {
      case 'up':
        snake.y-=snake.size;
        break;
      case 'down':
        snake.y+=snake.size;
        break;
      case 'left':
        snake.x-=snake.size;
        break;
      case 'right':
        snake.x+=snake.size;
        break;
    }
    snake.checkCollision();
    snake.checkGrowth();
    snake.sections.push(snake.x + ',' + snake.y);
  },
  
  draw: function(canvasX, canvasY) {
    for (i = 0; i < snake.sections.length; i++) {
      snake.drawSection(snake.sections[i].split(','),canvasX, canvasY);
    }    
  },
  
  drawSection: function(section, canvasX, canvasY) {
    game.drawBox(parseInt(section[0])+canvasX, parseInt(section[1])+canvasY, snake.size, snake.color);
  },
  
  checkCollision: function() {
    if (snake.isCollision(snake.x, snake.y) === true) {
      game.stop();
    }
  },
  
  isCollision: function(x, y) {
    if (x < snake.size/2 ||
        x > /*canvas*/BaseSquare.SquareWidth ||
        y < snake.size/2 ||
        y > /*canvas*/BaseSquare.SquareHeight ||
        snake.sections.indexOf(x+','+y) >= 0) {
      return true;
    }
  },
  
  checkGrowth: function() {
    if (snake.x == food.x && snake.y == food.y) {
	  game.time = 60;
      game.score++;
      if (game.score % 5 == 0 && game.fps < 60) {
        game.fps++;
      }
      food.set();
    } else {
      snake.sections.shift();
	  if(game.time > 0){
	     game.time--;
	  }
	  else{
	    //insert time bar code here
	  }
    }
  }
  
};

food = {
  
  size: null,
  x: null,
  y: null,
  color: '#0FF',
  
  set: function() {
    food.size = snake.size;
    food.x = (Math.ceil(Math.random() * 10) * snake.size * 4) - snake.size / 2;
    food.y = (Math.ceil(Math.random() * 10) * snake.size * 3) - snake.size / 2;
  },
  
  draw: function(canvasX, canvasY) {
    game.drawBox(food.x+canvasX, food.y+canvasY, food.size, food.color);
  }
  
};

inverseDirection = {
  'up':'down',
  'left':'right',
  'right':'left',
  'down':'up'
};

keys = {
  up: [38, 75, 87],
  down: [40, 74, 83],
  left: [37, 65, 72],
  right: [39, 68, 76],
  start_game: [13, 32]
};

Object.prototype.getKey = function(value){
  for(var key in this){
    if(this[key] instanceof Array && this[key].indexOf(value) >= 0){
      return key;
    }
  }
  return null;
};

addEventListener("keydown", function (e) {
    lastKey = keys.getKey(e.keyCode);
    if (['up', 'down', 'left', 'right'].indexOf(lastKey) >= 0
        && lastKey != inverseDirection[snake.direction]) {
      snake.direction = lastKey;
    } else if (['start_game'].indexOf(lastKey) >= 0 && game.over) {
      game.start();
    }
}, false);

/*var requestAnimationFrame =  window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame;

function loop() {
  if (game.over == false) {
    game.resetCanvas();
    game.drawScore();
    snake.move();
    food.draw();
    snake.draw();
    game.drawMessage();
  }
  setTimeout(function() {
    requestAnimationFrame(loop);
  }, 1000 / game.fps);
};

requestAnimationFrame(loop);

*/
//Set example game to inherit from the base game square
SnakeGame.prototype = new BaseSquare();

//Make sure it recognizes its type as YOURGAMENAMEHERE
SnakeGame.prototype.constructor=SnakeGame;

//Main constructor for the game - copies the variable initializations from the base square game
function SnakeGame(gameCanvas, gameCanvasContext, newx, newy){
	
	//Set up the canvas/context
	this.canvas=gameCanvas;
	this.context=gameCanvasContext;
	
	//Set the square's location inside the canvas
	this.canvasX=newx;
	this.canvasY=newy;
	this.gameCount=0;
	//Set up the base keydown function (not necessary if you want to implement your own custom event listener), look at the update function for details
	this.canvas.addEventListener( "keydown", this.doBaseKeyDown, true);

	//Set up the base keyup function (not necessary if you want to implement your own custom event listener), look at the update function for details
	this.canvas.addEventListener( "keyup", this.doBaseKeyUp, true);
	
	
	//CUSTOM VARIABLES/FUNCTIONS FOR THE GAME GO HERE
	
}

//Setting the update function that is called from the main game file
SnakeGame.prototype.update = function(gamespeed)
{ 
	this.updateBase(gamespeed); //Keep this
	
	//INCLUDE GAME UPDATE METHOD HERE
	//Note: the base game square class already handles the arrow keys, and
	//      you can access them by the booleans this.canvas._up, this.canvas._down, this.canvas._left, and this.canvas._right
	//
	//      when true the key is down, and when false the key is up
	if(this.gameCount==6){
	   snake.move();
	   this.gameCount=0;
	}
	else{
	   this.gameCount++;
	}
}

//Setting the update function that is called from the main game file
SnakeGame.prototype.draw = function()
{
	this.clear(); //Keep this
	this.drawBase(this.canvasX, this.canvasY); //Keep this
	//game.resetCanvas();
    game.drawScore(this.canvasX, this.canvasY);
    food.draw(this.canvasX, this.canvasY);
    snake.draw(this.canvasX, this.canvasY);
    game.drawMessage(this.canvasX, this.canvasY);
	//INCLUDE GAME DRAW METHOD HERE
} 