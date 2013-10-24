SimonSays.prototype = new BaseSquare();

SimonSays.prototype.constructor = SimonSays;

var page;
var stuff;
var gameX;
var gameY;
var redOpac;
var greenOpac;
var blueOpac;
var yellowOpac;
var circleCirc;
var intervalId;
var darkRed;
var darkGreen;
var echo = false;
var generate = false;
var letGenerate = true;
var moves = new Array();
var count = 0;
var backCount = 0;
var brake = 0;
var stop = true;


function SimonSays(gameCanvas, gameCanvasContext, newx, newy)
{
	page = gameCanvas;
	stuff = gameCanvasContext;
	gameY = newy;
	gameX = newx;
	redOpac = .5;
	greenOpac = .5;
	blueOpac = .5;
	yellowOpac = .5;
	circleCirc = 2 * 3.14;
	darkGreen = 114;
	darkRed = 0;
}

SimonSays.prototype.DrawIt = function()
{
	stuff.clearRect(gameX / 2, gameY / 2, gameX + BaseSquare.SquareWidth, gameY + BaseSquare.SquareHeight);
	drawRed(redOpac);
	drawGreen(greenOpac);
	drawYellow(yellowOpac);
	drawBlue(blueOpac);
	drawCirc(circleCirc, darkRed, darkGreen);
	
	if(redOpac > .6)
		redOpac -= .1;
	if(greenOpac > .6)
		greenOpac -= .1;
	if(yellowOpac > .6)
		yellowOpac -= .1;
	if(blueOpac > .6)
		blueOpac -= .1;
	if(circleCirc > (3.14 / 30))
		circleCirc -= (3.14 / 30);
	if(circleCirc < (3.14 / 30) && letGenerate == true)
	{
		generate = true;
		letGenerate = false;
		stop = false;
	}
		
	
	if(generate == true && brake == 0)
		randomizer();
	
	if(echo == true && brake == 0)
	{
		playBack();
	}
	
	if(brake > 0)
		brake--;
}

window.onkeydown = function onKeyDown(event)
{
	if(event.keyCode == 39 && echo == false && generate == false && stop == false)
	{
		yellowOpac = 1;
		checker(0);
	}
	else if(event.keyCode == 37 && echo == false && generate == false && stop == false)
	{
		redOpac = 1;
		checker(1);
	}
	else if(event.keyCode == 38 && echo == false && generate == false && stop == false)
	{
		greenOpac = 1;
		checker(2);
	}
	else if(event.keyCode == 40 && echo == false && generate == false && stop == false)
	{
		blueOpac = 1;
		checker(3);
	}
}

function checker(pressed)
{
	if(pressed == moves[backCount])
	{
		backCount++;
		if(backCount == count)
		{
			circleCirc = 2 * 3.14;
			darkRed = 0;
			darkGreen = 114;
			backCount = 0;
			letGenerate = true;
			stop = true;
		}
	}
	else if(pressed != moves[backCount])
	{
		circleCirc = 2 * 3.14;
		darkRed = 114;
		darkGreen = 0;
		drawCirc(circleCirc, darkRed, darkGreen);
		stop = true;
	}
}

function readMoves(move)
{
	if(move == 0)
		yellowOpac = 1;
	else if(move == 1)
		redOpac = 1;
	else if(move == 2)
		greenOpac = 1;
	else if(move == 3)
		blueOpac = 1;
}

function randomizer()
{
	moves[count] = Math.floor(Math.random() * 4);
	count++;
	echo = true;
	generate = false;
}

function playBack()
{
	if(blueOpac < .6 && redOpac < .6 && greenOpac < .6 && yellowOpac < .6)
	{
		if(backCount < count)
		{
			readMoves(moves[backCount]);
			backCount++;
			brake = 25;
		}
		else if(backCount == count)
		{
			backCount = 0;
			echo = false;
		}	
	}
}

function drawCirc(c, r, g)
{
	stuff.beginPath();
	stuff.arc((gameX + BaseSquare.SquareWidth / 2), (gameY + BaseSquare.SquareHeight / 2), 50, 0, c);
	stuff.closePath();
	stuff.fillStyle = "rgba(" + r + ", " + g + ", 0, 1)";
	stuff.fill();
}

function drawRed(a)
{
	stuff.beginPath();
	stuff.moveTo(gameX / 2, gameY / 2);
	stuff.lineTo((gameX + BaseSquare.SquareWidth / 2), (gameY + BaseSquare.SquareHeight / 2));
	stuff.lineTo(gameX / 2, (BaseSquare.SquareHeight * 2) - (gameY / 2));
	stuff.closePath();
	stuff.fillStyle = "rgba(255, 0, 0, " + a + ")";
	stuff.fill();
}

function drawGreen(a)
{
	stuff.beginPath();
	stuff.moveTo(gameX / 2, gameY / 2);
	stuff.lineTo((gameX + BaseSquare.SquareWidth / 2), (gameY + BaseSquare.SquareHeight / 2));
	stuff.lineTo((BaseSquare.SquareWidth* 2) - (gameX / 2), gameY / 2);
	stuff.closePath();
	stuff.fillStyle = "rgba(0, 255, 0, " + a + ")";
	stuff.fill();
}

function drawYellow(a)
{
	stuff.beginPath();
	stuff.moveTo((BaseSquare.SquareWidth * 2) - (gameX / 2), gameY / 2);
	stuff.lineTo((gameX + BaseSquare.SquareWidth / 2), (gameY + BaseSquare.SquareHeight / 2));
	stuff.lineTo((BaseSquare.SquareWidth * 2) - (gameX / 2), (BaseSquare.SquareHeight * 2) - (gameY / 2));
	stuff.closePath();
	stuff.fillStyle = "rgba(255, 255, 0, " + a + ")";
	stuff.fill();
}

function drawBlue(a)
{
	stuff.beginPath();
	stuff.moveTo(gameX / 2, (BaseSquare.SquareHeight * 2) - (gameY / 2));
	stuff.lineTo((gameX + BaseSquare.SquareWidth / 2), (gameY + BaseSquare.SquareHeight / 2));
	stuff.lineTo((BaseSquare.SquareWidth * 2) - (gameX / 2), (BaseSquare.SquareHeight * 2) - (gameY / 2));
	stuff.closePath();
	stuff.fillStyle = "rgba(0, 0, 255, " + a + ")";
	stuff.fill();
}