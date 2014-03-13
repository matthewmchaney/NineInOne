//SingleSquareTestArea.js handles the main functions for making the test area work. The only line you'll need to change here will be the 18th line, switching your own game's name in for Example1Game

//Size of our main game window
var CANVAS_WIDTH = BaseSquare.SquareWidth * 2;
var CANVAS_HEIGHT = BaseSquare.SquareHeight * 2;

//This is the canvas object
var canvas = document.getElementById('canvas');

//Set the canvas size, if it's not already there
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//The context of the canvas (used for drawing)
var canvasContext = canvas.getContext('2d');

//CHANGE THE ExampleGame TO YOUR GAME TYPE NAME TO USE THAT INSTEAD
var square = new YOURGAMEHERE(canvas, canvasContext, 0.5 * BaseSquare.SquareWidth, 0.5 * BaseSquare.SquareHeight);
square._focus = true;

//speed changing keys
var _r = false, _f = false, _v = false;

//Canvas base clear
function clear() {
	canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

//Canvas base draw
function draw() {
	canvasContext.fillStyle = "#EEF";
	canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

//Canvas base update
function update() {
	if(_r) gameSpeed++;
	if(_f) { gameSpeed--; if(gameSpeed <= 0) gameSpeed = 1; }
}

//Set up the keydown function
canvas.addEventListener( "keydown", doKeyDown, true);

//Set up the keyup function
canvas.addEventListener( "keyup", doKeyUp, true);

//KeyDown function
function doKeyDown(e) {
	if ( e.keyCode == 82 ) { //R
		_r = true;
	}
	if ( e.keyCode == 70 ) { //F
		_f = true;
	}
	if ( e.keyCode == 86 ) { //V
		//_v = true;
		enableTimer = !enableTimer;
	}
}

//KeyUp function
function doKeyUp(e) {
	if ( e.keyCode == 82 ) { //R
		_r = false;
	}
	if ( e.keyCode == 70 ) { //F
		_f = false;
	}
	if ( e.keyCode == 86 ) { //V
		//_v = false;
	}
}

//Overall GameSpeed
var gameSpeed = 100;

//GameLoop object to facilitate the gameloop
var gLoop;

var enableTimer = false;

//The main game loop here
var GameLoop = function(){

	//Update the test area first
	clear();
	update();
	draw();
	
	//Now update the test square
square.update(gameSpeed);
	square.draw();
	square.drawTime();
	square.drawFocus();
	
	if(enableTimer)
	{
		square.time -= .2 * gameSpeed / 100;
		if(square.time < 0)
			square.time = 100;
	}

	gLoop = setTimeout(GameLoop, 1000 / 60); //60fps
}

//Start the gameloop
GameLoop();