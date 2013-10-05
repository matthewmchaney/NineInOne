//BlankGame.js is an empty template for a new game. Example2Game.js directly worked off of this file to show how it works. 

//Set example game to inherit from the base game square
YOURGAMENAMEHERE.prototype = new BaseSquare();

//Make sure it recognizes its type as YOURGAMENAMEHERE
YOURGAMENAMEHERE.prototype.constructor=YOURGAMENAMEHERE;

//Main constructor for the game - copies the variable initializations from the base square game
function YOURGAMENAMEHERE(gameCanvas, gameCanvasContext, newx, newy){
	
	//Set up the canvas/context
	this.canvas=gameCanvas;
	this.context=gameCanvasContext;
	
	//Set the square's location inside the canvas
	this.canvasX=newx;
	this.canvasY=newy;
	
	//Set up the base keydown function (not necessary if you want to implement your own custom event listener), look at the update function for details
	this.canvas.addEventListener( "keydown", this.doBaseKeyDown, true);

	//Set up the base keyup function (not necessary if you want to implement your own custom event listener), look at the update function for details
	this.canvas.addEventListener( "keyup", this.doBaseKeyUp, true);
	
	
	//CUSTOM VARIABLES/FUNCTIONS FOR THE GAME GO HERE
	
}

//Setting the update function that is called from the main game file
YOURGAMENAMEHERE.prototype.update = function(gamespeed)
{ 
	this.updateBase(gamespeed); //Keep this
	
	//INCLUDE GAME UPDATE METHOD HERE
	//Note: the base game square class already handles the arrow keys, and
	//      you can access them by the booleans this._up, this._down, this._left, and this._right
	//
	//      when true the key is down, and when false the key is up
}

//Setting the update function that is called from the main game file
YOURGAMENAMEHERE.prototype.draw = function()
{
	this.clear(); //Keep this
	this.drawBase(); //Keep this
	
	//INCLUDE GAME DRAW METHOD HERE
} 