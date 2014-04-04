//BlankGame.js is an empty template for a new game. Example2Game.js directly worked off of this file to show how it works. 


//To do:
//-Fix the collisions with the floor from the sides
//-Fix the hit roof thing (failure/move lower)
//-Tweak speeds?
//-Something more


//Set example game to inherit from the base game square
DropGame.prototype = new BaseSquare();

//Make sure it recognizes its type as DropGame
DropGame.prototype.constructor=DropGame;

//Main constructor for the game - copies the variable initializations from the base square game
function DropGame(gameCanvas, gameCanvasContext, newx, newy){
	
	//Set up the canvas/context
	this.canvas=gameCanvas;
	this.context=gameCanvasContext;
	
	//Set the square's location inside the canvas
	this.canvasX=newx;
	this.canvasY=newy;
	
	//Create a new character at 50,0
	this.charX = BaseSquare.SquareWidth / 2;
	this.charY = DropGame.PlayerHeight / 2;
	
	//floor stuff
	this.floors = [];
	this.floorCount = 0;
	this.floorTimer = 0;
	
	
	//Set up the base keydown function (not necessary if you want to implement your own custom event listener), look at the update function for details
	this.canvas.addEventListener( "keydown", this.doBaseKeyDown, true);

	//Set up the base keyup function (not necessary if you want to implement your own custom event listener), look at the update function for details
	this.canvas.addEventListener( "keyup", this.doBaseKeyUp, true);
	
	
	//CUSTOM VARIABLES/FUNCTIONS FOR THE GAME GO HERE
	this.updateChar=function(gamespeed)
	{
		this.charY += DropGame.PlayerSpeed * (gamespeed / 100);
		
		if(this.canvas._left)
			this.charX -= DropGame.PlayerSpeed * (gamespeed / 100);
		if(this.canvas._right)
			this.charX += DropGame.PlayerSpeed * (gamespeed / 100);
			
		if(this.charX < DropGame.PlayerWidth / 2)
			this.charX = DropGame.PlayerWidth / 2;
		if(this.charX > BaseSquare.SquareWidth - DropGame.PlayerWidth / 2)
			this.charX = BaseSquare.SquareWidth - DropGame.PlayerWidth / 2;
		if(this.charY < DropGame.PlayerHeight / 2)
			this.charY = DropGame.PlayerHeight / 2;
		if(this.charY > BaseSquare.SquareHeight - DropGame.PlayerHeight / 2)
			this.charY = BaseSquare.SquareHeight - DropGame.PlayerHeight / 2;
	}
	
	this.drawChar=function()
	{
		this.context.fillStyle = "#000";
		this.context.fillRect(this.canvasX  + this.charX - DropGame.PlayerWidth / 2, this.canvasY  + this.charY - DropGame.PlayerHeight / 2, DropGame.PlayerWidth, DropGame.PlayerHeight);
	}
	
	this.updateFloor=function(gamespeed)
	{
		//check if new enemy is to be made
		this.floorTimer -= (gamespeed / 100);
		
		if(this.floorTimer <= 0)
		{
			this.floorTimer += DropGame.GapSpawnRate;
			this.floors.push([Math.random() * (BaseSquare.SquareWidth - DropGame.GapWidth), BaseSquare.SquareHeight]);
			this.floorCount++;
		}
		  
		//update position
	    for (var i = 0; i < this.floorCount; i++) {
			this.floors[i][1] -= DropGame.FloorSpeed * (gameSpeed / 100);
			if(this.floors[i][1] < -DropGame.FloorHeight)
			{
				this.floors.splice(i,1);
				this.floorCount--;
				i--;
			}
	    }
	}
	
	this.drawFloor=function()
	{
	    for (var i = 0; i < this.floorCount; i++) {
			canvasContext.fillStyle = "#000";
			
			var drawYTop = Math.max(this.canvasY, this.canvasY + this.floors[i][1]);
			var drawYHeight = Math.min(BaseSquare.SquareHeight + this.canvasY - drawYTop, DropGame.FloorHeight);
			
			canvasContext.fillRect(this.canvasX, drawYTop, this.floors[i][0], drawYHeight);
			canvasContext.fillRect(this.canvasX + this.floors[i][0] + DropGame.GapWidth, drawYTop, BaseSquare.SquareWidth - (this.floors[i][0] + DropGame.GapWidth), drawYHeight);
	    }
	}
	
	this.checkCollisions=function()
	{
		//make sure no collisions have occurred
		for (var i = 0; i < this.floorCount; i++) {
			if(this.Collides(this.floors[i]))
			{
				//Bad thing happens
				this.charY = this.floors[i][1] - DropGame.PlayerHeight / 2;
			}
		}
		
		if(this.charY < 0)
		{
			this.actionFailure();
			//Reset somewhere to the middle
		}
	}
	
	this.Collides=function(floor)
	{
		//Check the Y levels
		var topSide = floor[1];
		var bottomPlayerSide = this.charY + DropGame.PlayerHeight / 2;
		if(!(this.charY < floor[1] && floor[1] < bottomPlayerSide) &&
			!(this.charY < topSide && topSide < bottomPlayerSide))
				return false;
				
		//check if it's in the gap
		var leftSide = floor[0];
		var rightSide = floor[0] + DropGame.GapWidth;
		var leftPlayerSide = this.charX - DropGame.PlayerWidth / 2;
		var rightPlayerSide = this.charX + DropGame.PlayerWidth / 2;
		if((leftPlayerSide >= leftSide && rightSide >= rightPlayerSide))
				return false;
				
	
		return true;
	}
	
}

//Setting the update function that is called from the main game file
DropGame.prototype.update = function(gamespeed)
{ 
	this.updateBase(gamespeed); //Keep this
	
	this.updateChar(gamespeed);
	this.updateFloor(gamespeed);
	
	this.checkCollisions();
	//INCLUDE GAME UPDATE METHOD HERE
	//Note: the base game square class already handles the arrow keys, and
	//      you can access them by the booleans this.canvas._up, this.canvas._down, this.canvas._left, and this.canvas._right
	//
	//      when true the key is down, and when false the key is up
}

//Setting the update function that is called from the main game file
DropGame.prototype.draw = function()
{
	this.clear(); //Keep this
	this.drawBase(); //Keep this
	
	this.drawFloor();
	this.drawChar();
	
	//INCLUDE GAME DRAW METHOD HERE
} 

// ************************************************************************ 
// STATIC PROPERTIES -- ANYONE MAY READ/WRITE 
// ************************************************************************ 
DropGame.PlayerSpeed = 2;
DropGame.PlayerWidth = 10;
DropGame.PlayerHeight = 10;

DropGame.FloorHeight = 10;
DropGame.FloorSpeed = 1.5;
DropGame.GapWidth =  30;
DropGame.GapSpawnRate = 30; //lower is better