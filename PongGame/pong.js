//request Animation Frame
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

//setup canvas and grab its 2d context
var canvas = document.createElement('canvas');
var width = 400;
var height = 400;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

//call step function using animate method
window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

//step function
var step = function() {
  update();
  render();
  animate(step);
};

//update function
var update = function() {
  player.update();
  computer.update(ball);
  ball.update(player.paddle, computer.paddle);
};

//render function
var render = function() {
  //context.fillStyle = "#FFF";
  context.fillStyle = "#FF00FF";
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  ball.render();
};

//Paddle creation function
function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

//Paddle render function
Paddle.prototype.render = function() {
  context.fillStyle = "#0000FF";
  context.fillRect(this.x, this.y, this.width, this.height);
};

//Player creation function
function Player() {
   this.paddle = new Paddle(175, 380, 50, 10);
}

//Computer creation function
function Computer() {
   this.paddle = new Paddle(175, 10, 50, 10);
};

//Player paddle render function
Player.prototype.render = function() {
  this.paddle.render();
};

//Computer paddle render function
Computer.prototype.render = function() {
  this.paddle.render();
};

//Ball function
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = 3;
  this.radius = 5;
}

//Ball render function
Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 *Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();
};

//Build objects
var player = new Player();
var computer = new Computer();
var ball = new Ball(width/2, height/2);

//Ball update method
Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;
  
  if(this.x - 5 < 0) {//hitting left wall
    this.x = 5;
	this.x_speed = -this.x_speed;
  } else if(this.x + 5 > width) {//hitting the right wall
    this.x = 395;
	this.x_speed = -this.x_speed;
  }
  
  if(this.y < 0 || this.y > height) {//point was scored
    this.x_speed = 0;
	this.y_speed = 3;
	this.x = width/2;
	this.y = height/2;
  }
  
  if(top_y > height/2) {
    if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
	   //hit the player's paddle
	   this.y_speed = -3;
	   this.x_speed += (paddle1.x_speed / 2);
	   this.y += this.y_speed;
	}
  } else {
    if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
	  //hit the computer's paddle
	  this.y_speed = 3;
	  this.x_speed += (paddle2.x_speed / 2);
	  this.y += this.y_speed;
	}
  }
};

//Controls
var keysDown = {};

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});

Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
	if(value == 37) {//left arrow
	  this.paddle.move(-4, 0);
	} else if (value == 39) {//right arrow
	  this.paddle.move(4, 0);
	} else {
	  this.paddle.move(0, 0);
	}
  }
};

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.x < 0) {//all the way to the left
    this.x = 0;
	this.x_speed = 0;
  } else if (this.x + this.width > 400) {//all the way to the right
    this.x = 400 - this.width;
	this.x_speed = 0;
  }
}

//computer AI
Computer.prototype.update = function(ball) {
  var x_pos = ball.x;
  var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
  if(diff < 0 && diff < -4) {//max speed left
    diff = -5;
  } else if(diff > 0 && diff > 4) {//max speed right
    diff = 5;
  }
  this.paddle.move(diff,0);
  if(this.paddle.x < 0) {
    this.paddle.x = 0;
  } else if (this.paddle.x + this.paddle.width > 400) {
    this.paddle.x = 400 - this.paddle.width;
  }
};