//Okay, let's hit this from the TOP YO MOFOFOFOFOFOFOFOFOFO
MenuStateEnum = {
	MAIN : 0,
	PLAY : 1,
	GAMEOVER : 2,
	ABOUT : 3,
	HIGHSCORES : 4,
	GAMESELECT : 5
}

GamesEnum = {
	DropGame : 4,
	BlockDodgeGame : 3,
	SnakeGame : 2,
	SimonSaysGame : 1,
	PongGame : 0
}

function GetGameName(num)
{
	switch(num)
	{
		case GamesEnum.DropGame:
		return "Drop Game";
		case GamesEnum.BlockDodgeGame:
		return "Block Dodge";
		case GamesEnum.PongGame:
		return "Pong";
		case GamesEnum.SnakeGame:
		return "Snake";
		case GamesEnum.SimonSaysGame:
		return "Simon Says";
	}
}

function GetControls(num)
{
	switch(num)
	{
		case MenuStateEnum.MAIN:
		return "Space to select option";
		case MenuStateEnum.PLAY:
		return "Esc to return";
		case MenuStateEnum.GAMEOVER:
		return "Space to retry, Esc to return";
		case MenuStateEnum.ABOUT:
		return "Space/Esc to return";
		case MenuStateEnum.HIGHSCORES:
		return "Esc to return";
		case MenuStateEnum.GAMESELECT:
		return "Space to select, Esc to return";
	}
}

function InitializeGame()
{
	//Create the game. 
	//use switch later
	switch(_gameChoice)
	{
		case GamesEnum.DropGame:
			square = new DropGame(canvas, canvasContext, (CANVAS_WIDTH - BaseSquare.SquareWidth) / 2, (CANVAS_HEIGHT - BaseSquare.SquareHeight) / 2);
			break;
		case GamesEnum.BlockDodgeGame:
			square = new BlockDodgeGame(canvas, canvasContext, (CANVAS_WIDTH - BaseSquare.SquareWidth) / 2, (CANVAS_HEIGHT - BaseSquare.SquareHeight) / 2);
			break;
		case GamesEnum.PongGame:
			square = new PongGame(canvas, canvasContext, (CANVAS_WIDTH - BaseSquare.SquareWidth) / 2, (CANVAS_HEIGHT - BaseSquare.SquareHeight) / 2);
			break;
		case GamesEnum.SnakeGame:
			square = new SnakeGame(canvas, canvasContext, (CANVAS_WIDTH - BaseSquare.SquareWidth) / 2, (CANVAS_HEIGHT - BaseSquare.SquareHeight) / 2);
			break;
		case GamesEnum.SimonSaysGame:
			square = new SimonSays(canvas, canvasContext, (CANVAS_WIDTH - BaseSquare.SquareWidth) / 2, (CANVAS_HEIGHT - BaseSquare.SquareHeight) / 2);
			break;
	}
}

var menu_state = MenuStateEnum.MAIN;
var _gameChoice = 0;

//Size of our main game window
var CANVAS_WIDTH = 320;
var CANVAS_HEIGHT = 320;

var _selectIndex = 0;
var _wasUp = false, _wasDown = false, _wasLeft = false, _wasRight = false;
var _up = false, _down = false, _left = false, _right = false;
var _space = false, _wasSpace = false;
var _escape = false, _wasEscape = false;

//This is the canvas object
var canvas = document.getElementById('canvas');

//Set the canvas size, if it's not already there
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//The context of the canvas (used for drawing)
var canvasContext = canvas.getContext('2d');

var square;

//Canvas base clear
function clear() {
	canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

//Canvas base draw
function draw() {
	switch(menu_state)
	{
		case MenuStateEnum.MAIN:
			canvasContext.fillStyle = "#EEF";
			canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			canvasContext.fillStyle = "#000";
			canvasContext.font="32px Franklin Gothic Medium";
			canvasContext.fillText("Minigame",80,45);
			canvasContext.fillText("Collection",110,80);
			canvasContext.font="16px Franklin Gothic Medium";
			canvasContext.fillText("Play Game",50,140);
			canvasContext.fillText("About",50,175);
			//canvasContext.fillText("Highscores",50,90);
			canvasContext.fillText(">", 30, 140 + _selectIndex * 35);
		break;
		case MenuStateEnum.PLAY:
			canvasContext.fillStyle = "#EEF";
			canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			square.draw();
			if(square.showTimer)
				square.drawTime();
		break;
		case MenuStateEnum.GAMEOVER:
			canvasContext.fillStyle = "#EEF";
			canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			
			square.draw();
			if(square.showTimer)
				square.drawTime();
			square.drawFocus();
			
			canvasContext.fillStyle = "#000";
			canvasContext.font="24px Franklin Gothic Medium";
			canvasContext.textAlign = 'center';
			canvasContext.fillText("Game Over",160,40);
			canvasContext.font="18px Franklin Gothic Medium";
			canvasContext.fillText("Space to retry",80,288);
			canvasContext.fillText("Esc to quit",240,288);
			
		break;
		case MenuStateEnum.ABOUT:
			canvasContext.fillStyle = "#EEF";
			canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			canvasContext.fillStyle = "#000";
			canvasContext.font="18px Franklin Gothic Medium";
			canvasContext.fillText("HTML5 games created",50,50);
			canvasContext.fillText("for KSU Game Dev Club",60,80);
			canvasContext.textAlign = 'left';
			//canvasContext.font="20px Georgia";
			canvasContext.font="16px Franklin Gothic Medium";
			canvasContext.fillText("Pong, Snake",30,130);
			canvasContext.fillText("Jacob Martin",50,150);
			canvasContext.fillText("Simon Says",30,180);
			canvasContext.fillText("Clyde Dopheide",50,200);
			canvasContext.fillText("Block Dodge, Drop Game",30,230);
			canvasContext.fillText("Matthew McHaney",50,250);
		break;
		case MenuStateEnum.HIGHSCORES:
			canvasContext.fillStyle = "#EEF";
			canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		break;
		case MenuStateEnum.GAMESELECT:
			canvasContext.fillStyle = "#EEF";
			canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			canvasContext.fillStyle = "#000";
			canvasContext.font="24px Franklin Gothic Medium";
			//canvasContext.font="20px Georgia";
			canvasContext.textAlign = 'center';
			canvasContext.fillText("Game Select",160,45);
			canvasContext.fillText(GetGameName(_gameChoice),160,110);
			canvasContext.fillText("<",50, 110);
			canvasContext.fillText(">",270, 110);
		break;
	}
	
    canvasContext.textAlign = 'left';
	canvasContext.fillStyle = "#BBD";
	canvasContext.font="12px Georgia";
	canvasContext.fillText(GetControls(menu_state),10,CANVAS_HEIGHT - 10);
	
}

//Canvas base update
function update() {
	switch(menu_state)
	{
		case MenuStateEnum.MAIN:
		if(_up)
		{
			if(!_wasUp)
			{
				_selectIndex--;
				if(_selectIndex < 0)
					_selectIndex = 0;
				_wasUp = true;
			}
		}
		else
		{
			_wasUp = false;
		}
		if(_down)
		{
			if(!_wasDown)
			{
				_selectIndex++;
				if(_selectIndex > 1)
					_selectIndex = 1;
				_wasDown = true;
			}
		}
		else
		{
			_wasDown = false;
		}
		//Do things
		if(_space)
		{
			if(!_wasSpace)
			{
				switch(_selectIndex)
				{
					case 0: //start
						menu_state = MenuStateEnum.GAMESELECT;
						break;
					//case 1: //scores
					//	menu_state = MenuStateEnum.HIGHSCORES;
					//	break;
					case 1: //about
						menu_state = MenuStateEnum.ABOUT;
						break;
				}
				_wasSpace = true;
			}
		}
		else
		{
			_wasSpace = false;
		}
		break;
		case MenuStateEnum.PLAY:
		square.update(100); //switch with gamespeed later
		
		if(square.time <= 0)
			menu_state = MenuStateEnum.GAMEOVER;
		
		if(_escape)
		{
			if(!_wasEscape)
			{
				menu_state = MenuStateEnum.MAIN;
				_wasEscape = true;
			}
		}
		else
		{
			_wasEscape = false;
		}
		break;
		case MenuStateEnum.GAMEOVER:
		if(_escape)
		{
			if(!_wasEscape)
			{
				menu_state = MenuStateEnum.MAIN;
				_wasEscape = true;
			}
		}
		else
		{
			_wasEscape = false;
		}
		if(_space)
		{
			if(!_wasSpace)
			{
				menu_state = MenuStateEnum.PLAY;
				//Create the game in the screen
				InitializeGame();
				_wasSpace = true;
			}
		}
		else
		{
			_wasSpace = false;
		}
		//square.update(100); //switch with gamespeed later
		break;
		case MenuStateEnum.ABOUT:
		if(_space)
		{
			if(!_wasSpace)
			{
				menu_state = MenuStateEnum.MAIN;
				_wasSpace = true;
			}
		}
		else
		{
			_wasSpace = false;
		}
		if(_escape)
		{
			if(!_wasEscape)
			{
				menu_state = MenuStateEnum.MAIN;
				_wasEscape = true;
			}
		}
		else
		{
			_wasEscape = false;
		}
		break;
		case MenuStateEnum.HIGHSCORES:
		if(_escape)
		{
			if(!_wasEscape)
			{
				menu_state = MenuStateEnum.MAIN;
				_wasEscape = true;
			}
		}
		else
		{
			_wasEscape = false;
		}
		break;
		case MenuStateEnum.GAMESELECT:
		if(_left)
		{
			if(!_wasLeft)
			{
				_gameChoice--;
				if(_gameChoice < 0)
					_gameChoice = 4;
				_wasLeft = true;
			}
		}
		else
		{
			_wasLeft = false;
		}
		if(_right)
		{
			if(!_wasRight)
			{
				_gameChoice++;
				if(_gameChoice > 4)
					_gameChoice = 0;
				_wasRight = true;
			}
		}
		else
		{
			_wasRight = false;
		}
		if(_space)
		{
			if(!_wasSpace)
			{
				menu_state = MenuStateEnum.PLAY;
				//Create the game in the screen
				InitializeGame();
				_wasSpace = true;
			}
		}
		else
		{
			_wasSpace = false;
		}
		if(_escape)
		{
			if(!_wasEscape)
			{
				menu_state = MenuStateEnum.MAIN;
				_wasEscape = true;
			}
		}
		else
		{
			_wasEscape = false;
		}
		break;
	}
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
	if ( e.keyCode == 37 ) { //Left
		_left = true;
	}
	if ( e.keyCode == 38 ) { //Up
		_up = true;
	}
	if ( e.keyCode == 39 ) { //Right
		_right = true;
	}
	if ( e.keyCode == 40 ) { //Down
		_down = true;
	}
	if ( e.keyCode == 32 ) { //Space
		_space = true;
	}
	if ( e.keyCode == 27 ) { //Escape
		_escape = true;
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
	if ( e.keyCode == 37 ) { //Left
		_left = false;
	}
	if ( e.keyCode == 38 ) { //Up
		_up = false;
	}
	if ( e.keyCode == 39 ) { //Right
		_right = false;
	}
	if ( e.keyCode == 40 ) { //Down
		_down = false;
	}
	if ( e.keyCode == 32 ) { //Space
		_space = false;
	}
	if ( e.keyCode == 27 ) { //Escape
		_escape = false;
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
	
	/*//Now update the test square
	square.update(gameSpeed);
	square.draw();
	square.drawTime();
	square.drawFocus();
	
	if(enableTimer)
	{
		square.time -= .2 * gameSpeed / 100;
		if(square.time < 0)
			square.time = 100;
	}*/

	gLoop = setTimeout(GameLoop, 1000 / 60); //60fps
}

//Start the gameloop
GameLoop();

canvas.focus();