//DemoTestArea.js handles the main functions for making the test area work. The only line you'll need to change here will be the 18th line, switching your own game's name in for Example1Game

//Size of our main game window
var CANVAS_WIDTH = BaseSquare.SquareWidth * 4;
var CANVAS_HEIGHT = BaseSquare.SquareHeight * 4;

//This is the canvas object
var canvas = document.getElementById('canvas');

//Set the canvas size, if it's not already there
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//The context of the canvas (used for drawing)
var canvasContext = canvas.getContext('2d');

//CHANGE THE ExampleGame TO YOUR GAME TYPE NAME TO USE THAT INSTEAD
var squares = [];
for(var i = 0; i < 9; i++)
{
	squares[i] = (new Example1Game(canvas, canvasContext, (0.5 + i % 3) * BaseSquare.SquareWidth, (0.5 + Math.floor(i / 3)) * BaseSquare.SquareHeight));
}

squares[0]._focus = true;
var focused = 0;

//speed changing keys
var _r = false, _f = false, _v = false;

//context switching keys
var _q = false, _w = false, _e = false;
var _a = false, _s = false, _d = false;
var _z = false, _x = false, _c = false;

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
	
	//Context switch
	if ( e.keyCode == 81 ) { //Q
		_q = true;
		squares[focused]._focus = false;
		squares[0]._focus = true;
		focused = 0;
	}
	if ( e.keyCode == 87 ) { //W
		_w = true;
		squares[focused]._focus = false;
		squares[1]._focus = true;
		focused = 1;
	}
	if ( e.keyCode == 69 ) { //E
		_e = true;
		squares[focused]._focus = false;
		squares[2]._focus = true;
		focused = 2;
	}
	if ( e.keyCode == 65 ) { //A
		_a = true;
		squares[focused]._focus = false;
		squares[3]._focus = true;
		focused = 3;
	}
	if ( e.keyCode == 83 ) { //S
		_s = true;
		squares[focused]._focus = false;
		squares[4]._focus = true;
		focused = 4;
	}
	if ( e.keyCode == 68 ) { //D
		_d = true;
		squares[focused]._focus = false;
		squares[5]._focus = true;
		focused = 5;
	}
	if ( e.keyCode == 90 ) { //Z
		_z = true;
		squares[focused]._focus = false;
		squares[6]._focus = true;
		focused = 6;
	}
	if ( e.keyCode == 88 ) { //X
		_x = true;
		squares[focused]._focus = false;
		squares[7]._focus = true;
		focused = 7;
	}
	if ( e.keyCode == 67 ) { //C
		_c = true;
		squares[focused]._focus = false;
		squares[8]._focus = true;
		focused = 8;
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
	
	if ( e.keyCode == 81 ) { //Q
		_q = false;
	}
	if ( e.keyCode == 87 ) { //W
		_w = false;
	}
	if ( e.keyCode == 69 ) { //E
		_e = false;
	}
	if ( e.keyCode == 65 ) { //A
		_a = false;
	}
	if ( e.keyCode == 83 ) { //S
		_s = false;
	}
	if ( e.keyCode == 68 ) { //D
		_d = false;
	}
	if ( e.keyCode == 90 ) { //Z
		_z = false;
	}
	if ( e.keyCode == 88 ) { //X
		_x = false;
	}
	if ( e.keyCode == 67 ) { //C
		_c = false;
	}
}

//Overall GameSpeed
var gameSpeed = 100;

//GameLoop object to facilitate the gameloop
var gLoop;

var enableTimer = true;

//The main game loop here
var GameLoop = function(){

	//Update the test area first
	clear();
	update();
	draw();
	
	if(enableTimer)
	{
		squares[focused].time -= .2 * gameSpeed / 100;
		if(squares[focused].time < 0)
			squares[focused].time = 100;
	}
	
	//Now update the test square
	for(var i = 0; i < 9; i++)
	{
		if(squares[i]._focus)
			squares[i].update(gameSpeed);
		squares[i].draw();
		squares[i].drawTime();
		squares[i].drawFocus();
	}

	gLoop = setTimeout(GameLoop, 1000 / 60); //60fps
}

//Start the gameloop
GameLoop();