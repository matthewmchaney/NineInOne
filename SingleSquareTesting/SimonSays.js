SimonSays.prototype = new BaseSquare();

SimonSays.prototype.constructor = SimonSays;


/*
The Constructor for the game, sets all the variables for reasons.
*/
function SimonSays(gameCanvas, gameCanvasContext, newx, newy)
{
	var page = gameCanvas;
	this.canvas = page;
	var stuff = gameCanvasContext;
	this.context = stuff;
	var gameY = newy;
	this.canvasY = newy;
	var gameX = newx;
	this.canvasX = newx;
	var redOpac = .5;
	var greenOpac = .5;
	var blueOpac = .5;
	var yellowOpac = .5;
	var circleCirc = 2 * 3.14;
	var darkGreen = 114;
	var darkRed = 0;
	var brakeTime = 27;
	var echo = false;
	var generate = false;
	var letGenerate = true;
	var moves = new Array();
	var count = 0;
	var backCount = 0;
	var brake = 0;
	var stop = true;
	var pressed = -1;
	
this.checker = function(pressed)
{
	if(pressed == -1) return;
	if(pressed == moves[backCount])
	{
		backCount++;
		if(backCount == count)
		{
			circleCirc = 2 * Math.PI;
			darkRed = 0;
			darkGreen = 114;
			backCount = 0;
			if(brakeTime > 6)
				brakeTime -= 3;
			letGenerate = true;
			stop = true;
			this.actionSuccess();
		}
	}
	else if(pressed != moves[backCount])
	{
		circleCirc = 2 * Math.PI;
		darkRed = 114;
		darkGreen = 0;
		drawCirc(circleCirc, darkRed, darkGreen);
		brakeTime = 27;
		count = 0;
		backCount = 0;
		letGenerate = true;
		stop = true;
	}
}

	
	this.onKeyDown = function (event)
	{
	if(event.keyCode == 39 && echo == false && generate == false && stop == false)
	{
		yellowOpac = 1;
		pressed = 0;
	}
	else if(event.keyCode == 37 && echo == false && generate == false && stop == false)
	{
		redOpac = 1;
		pressed = 1;
	}
	else if(event.keyCode == 38 && echo == false && generate == false && stop == false)
	{
		greenOpac = 1;
		pressed = 2;
	}
	else if(event.keyCode == 40 && echo == false && generate == false && stop == false)
	{
		blueOpac = 1;
		pressed = 3;
	}
	}
	this.canvas.addEventListener( "keydown", this.onKeyDown, true);
	
readMoves = function(move)
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

randomizer = function()
{
	moves[count] = Math.floor(Math.random() * 4);
	count++;
	echo = true;
	generate = false;
}

playBack = function()
{
	if(blueOpac < .6 && redOpac < .6 && greenOpac < .6 && yellowOpac < .6)
	{
		if(backCount < count)
		{
			readMoves(moves[backCount]);
			backCount++;
			brake = brakeTime;
		}
		else if(backCount == count)
		{
			backCount = 0;
			echo = false;
		}	
	}
}

drawCirc = function(c, r, g)
{
	stuff.beginPath();
	stuff.arc((gameX + BaseSquare.SquareWidth / 2), (gameY + BaseSquare.SquareHeight / 2), 50, 0, c);
	stuff.lineTo((gameX + BaseSquare.SquareWidth / 2), (gameY + BaseSquare.SquareHeight / 2));
	stuff.closePath();
	stuff.fillStyle = "rgba(" + r + ", " + g + ", 0, 1)";
	stuff.fill();
}

drawRed = function(a)
{
	stuff.beginPath();
	stuff.moveTo(gameX, gameY);
	stuff.lineTo((gameX + BaseSquare.SquareWidth / 2), (gameY + BaseSquare.SquareHeight / 2));
	stuff.lineTo(gameX, (BaseSquare.SquareHeight * 2) - (gameY));
	stuff.closePath();
	stuff.fillStyle = "rgba(255, 0, 0, " + a + ")";
	stuff.fill();
}

drawGreen = function(a)
{
	stuff.beginPath();
	stuff.moveTo(gameX, gameY);
	stuff.lineTo((gameX + BaseSquare.SquareWidth / 2), (gameY + BaseSquare.SquareHeight / 2));
	stuff.lineTo((BaseSquare.SquareWidth* 2) - (gameX), gameY);
	stuff.closePath();
	stuff.fillStyle = "rgba(0, 255, 0, " + a + ")";
	stuff.fill();
}

drawYellow = function(a)
{
	stuff.beginPath();
	stuff.moveTo((BaseSquare.SquareWidth * 2) - (gameX), gameY);
	stuff.lineTo((gameX + BaseSquare.SquareWidth / 2), (gameY + BaseSquare.SquareHeight / 2));
	stuff.lineTo((BaseSquare.SquareWidth * 2) - (gameX), (BaseSquare.SquareHeight * 2) - (gameY));
	stuff.closePath();
	stuff.fillStyle = "rgba(255, 255, 0, " + a + ")";
	stuff.fill();
}

drawBlue = function(a)
{
	stuff.beginPath();
	stuff.moveTo(gameX, (BaseSquare.SquareHeight * 2) - (gameY));
	stuff.lineTo((gameX + BaseSquare.SquareWidth / 2), (gameY + BaseSquare.SquareHeight / 2));
	stuff.lineTo((BaseSquare.SquareWidth * 2) - (gameX), (BaseSquare.SquareHeight * 2) - (gameY));
	stuff.closePath();
	stuff.fillStyle = "rgba(0, 0, 255, " + a + ")";
	stuff.fill();
}

this.DrawIt = function()
{
	this.checker(pressed);
	pressed = -1;
	square.drawTime();
	stuff.clearRect(gameX, gameY, BaseSquare.SquareWidth, BaseSquare.SquareHeight);
	drawRed(redOpac);
	drawGreen(greenOpac);
	drawYellow(yellowOpac);
	drawBlue(blueOpac);
	drawCirc(circleCirc, darkRed, darkGreen);
	this.actionFailure();
	
	if(redOpac > .6)
		redOpac -= .1;
	if(greenOpac > .6)
		greenOpac -= .1;
	if(yellowOpac > .6)
		yellowOpac -= .1;
	if(blueOpac > .6)
		blueOpac -= .1;
	if(circleCirc >= (Math.PI / 30))
		circleCirc -= (Math.PI / 15);
	if(circleCirc < (Math.PI / 30) && letGenerate == true)
	{
		circleCirc = 0;
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

}