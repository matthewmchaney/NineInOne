//Example2Game.js displays a square that can be controlled by the arrow keys. Displays the use of the base input functions to handle arrow keys.

//Set example game to inherit from the base game square
Example2Game.prototype = new BaseSquare();

Example2Game.prototype.constructor=Example2Game;

//Main constructor for the game - copies the variable initializations from the base square game
function Example2Game(gameCanvas, gameCanvasContext, newx, newy){
	
	this.canvas=gameCanvas;
	this.context=gameCanvasContext;
	
	this.canvasX=newx;
	this.canvasY=newy;
	
	//Create a new character at 50,50
	this.charX = 50;
	this.charY = 50;
	
	//Speed for the character
	this.charSpeed = 2;
	
	//Set up the base keydown function (not necessary if you want to implement your own custom event listener), look at the update function for details
	this.canvas.addEventListener( "keydown", this.doBaseKeyDown, true);

	//Set up the base keyup function (not necessary if you want to implement your own custom event listener), look at the update function for details
	this.canvas.addEventListener( "keyup", this.doBaseKeyUp, true);
	
	
	//CUSTOM VARIABLES/FUNCTIONS FOR THE GAME GO HERE
	this.updateChar=function(gamespeed)
	{
		if(this.canvas._up)
			this.charY -= this.charSpeed * (gamespeed / 100);
		if(this.canvas._down)
			this.charY += this.charSpeed * (gamespeed / 100);
		if(this.canvas._left)
			this.charX -= this.charSpeed * (gamespeed / 100);
		if(this.canvas._right)
			this.charX += this.charSpeed * (gamespeed / 100);
			
		if(this.charX < 0)
			this.charX = 0;
		if(this.charX > BaseSquare.SquareWidth - 10)
			this.charX = BaseSquare.SquareWidth - 10;
		if(this.charY < 0)
			this.charY = 0;
		if(this.charY > BaseSquare.SquareHeight - 10)
			this.charY = BaseSquare.SquareHeight - 10;
	}
	
	
	this.drawChar=function()
	{
		this.context.fillStyle = "#000";
		this.context.fillRect(this.canvasX  + this.charX, this.canvasY  + this.charY, 10, 10);
	}
	
	
}

//Setting the update function that is called from the main game file
Example2Game.prototype.update = function(gamespeed)
{ 
	this.updateBase(gamespeed); //Keep this
	
	this.updateChar(gamespeed);
	//INCLUDE GAME UPDATE METHOD HERE
	//Note: the base game square class already handles the arrow keys, and
	//      you can access them by the booleans this.canvas._up, this.canvas._down, this.canvas._left, and this.canvas._right
	//
	//      when true the key is down, and when false the key is up
}

//Setting the update function that is called from the main game file
Example2Game.prototype.draw = function()
{
	this.clear(); //Keep this
	this.drawBase(); //Keep this
	
	this.drawChar();
	
	//INCLUDE GAME DRAW METHOD HERE
} 