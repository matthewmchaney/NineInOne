//BlockDodgeGame.js displays a square that can be controlled by the arrow keys. Displays the use of the base input functions to handle arrow keys.

//NEEDS:
//1. collisions
//2. Put it into the full 9x9

//Set example game to inherit from the base game square
BlockDodgeGame.prototype = new BaseSquare();

BlockDodgeGame.prototype.constructor=BlockDodgeGame;

//Main constructor for the game - copies the variable initializations from the base square game
function BlockDodgeGame(gameCanvas, gameCanvasContext, newx, newy){
	
	this.showTimer = true;
	
	//enemy variables
	var enemies = [], enemyCount = 0, enemyTimer = BlockDodgeGame.BlockSpeed;
	
	var invincibilityTimer = BlockDodgeGame.InvincibilityIteration * BlockDodgeGame.InvincibilityDuration;
	
	this.canvas=gameCanvas;
	this.context=gameCanvasContext;
	
	this.canvasX=newx;
	this.canvasY=newy;
	
	//Create a new character at 50,50
	this.charX = 50;
	this.charY = 50;
	
	//Set up the base keydown function (not necessary if you want to implement your own custom event listener), look at the update function for details
	this.canvas.addEventListener( "keydown", this.doBaseKeyDown, true);

	//Set up the base keyup function (not necessary if you want to implement your own custom event listener), look at the update function for details
	this.canvas.addEventListener( "keyup", this.doBaseKeyUp, true);
	
	
	//CUSTOM VARIABLES/FUNCTIONS FOR THE GAME GO HERE
	this.updateChar=function(gamespeed)
	{
		invincibilityTimer--;
		
		if(this.canvas._up)
			this.charY -= BlockDodgeGame.PlayerSpeed * (gamespeed / 100);
		if(this.canvas._down)
			this.charY += BlockDodgeGame.PlayerSpeed * (gamespeed / 100);
		if(this.canvas._left)
			this.charX -= BlockDodgeGame.PlayerSpeed * (gamespeed / 100);
		if(this.canvas._right)
			this.charX += BlockDodgeGame.PlayerSpeed * (gamespeed / 100);
			
		if(this.charX < BlockDodgeGame.PlayerWidth / 2)
			this.charX = BlockDodgeGame.PlayerWidth / 2;
		if(this.charX > BaseSquare.SquareWidth - BlockDodgeGame.PlayerWidth / 2)
			this.charX = BaseSquare.SquareWidth - BlockDodgeGame.PlayerWidth / 2;
		if(this.charY < BlockDodgeGame.PlayerHeight / 2)
			this.charY = BlockDodgeGame.PlayerHeight / 2;
		if(this.charY > BaseSquare.SquareHeight - BlockDodgeGame.PlayerHeight / 2)
			this.charY = BaseSquare.SquareHeight - BlockDodgeGame.PlayerHeight / 2;
	}
	
	this.updateEnemy=function(gamespeed)
	{
		//check if new enemy is to be made
		enemyTimer--;
		if(enemyTimer <= 0)
		{
			enemyTimer += Math.random() * BlockDodgeGame.BlockSpawnRate / 2 + BlockDodgeGame.BlockSpawnRate * 3 / 4;
			enemies.push([Math.random() * BaseSquare.SquareWidth, -BlockDodgeGame.BlockHeight, Math.random() * BlockDodgeGame.BlockSpeed / 2 + BlockDodgeGame.BlockSpeed * 3 / 4, "#" + (Math.floor((Math.random() * 230)) + 10).toString(16) + (Math.floor((Math.random() * 230)) + 10).toString(16) + (Math.floor((Math.random() * 230)) + 10).toString(16)]);
			enemyCount++;
		}
		  
		//update position
	    for (var i = 0; i < enemyCount; i++) {
			enemies[i][1] += enemies[i][2] * (gameSpeed / 100);
			if(enemies[i][1] > BaseSquare.SquareHeight)
			{
				enemies.splice(i,1);
				enemyCount--;
				i--;
			}
	    }
	}
	
	this.checkCollisions=function()
	{
		if(invincibilityTimer > 0)
			return;
		//make sure no collisions have occurred
		for (var i = 0; i < enemyCount; i++) {
			if(this.Collides(enemies[i]))
			{
				//Bad thing happens
				this.actionFailure();
				invincibilityTimer = BlockDodgeGame.InvincibilityIteration * (BlockDodgeGame.InvincibilityDuration + 1);
			}
		}
	}
	
	this.Collides=function(enemy)
	{
		var leftSide = enemy[0] - BlockDodgeGame.BlockWidth / 2;
		var rightSide = enemy[0] + BlockDodgeGame.BlockWidth / 2;
		var leftPlayerSide = this.charX - BlockDodgeGame.PlayerWidth / 2;
		var rightPlayerSide = this.charX + BlockDodgeGame.PlayerWidth / 2;
		if(!(leftPlayerSide < leftSide && leftSide < rightPlayerSide) &&
			!(leftPlayerSide < rightSide && rightSide < rightPlayerSide))
				return false;
				
		var bottomSide = enemy[1] + BlockDodgeGame.BlockHeight;
		var bottomPlayerSide = this.charY + BlockDodgeGame.PlayerHeight;
		if(!(this.charY < enemy[1] && enemy[1] < bottomPlayerSide) &&
			!(this.charY < bottomSide && bottomSide < bottomPlayerSide))
				return false;
		return true;
	}
	
	this.drawChar=function()
	{
		if(Math.round(invincibilityTimer / BlockDodgeGame.InvincibilityIteration) % 2 == 1)
		{
			return;
		}
		this.context.fillStyle = "#000";
		this.context.fillRect(this.canvasX  + this.charX - BlockDodgeGame.PlayerWidth / 2, this.canvasY  + this.charY - BlockDodgeGame.PlayerHeight / 2, BlockDodgeGame.PlayerWidth, BlockDodgeGame.PlayerHeight);
	}
	
	this.drawEnemy=function()
	{
	    for (var i = 0; i < enemyCount; i++) {
			canvasContext.fillStyle = enemies[i][3];//"#F0F";
			canvasContext.fillRect(this.canvasX  + enemies[i][0] - BlockDodgeGame.BlockWidth / 2, this.canvasY + enemies[i][1], BlockDodgeGame.BlockWidth, BlockDodgeGame.BlockHeight);
	    }
	}
}

//Setting the update function that is called from the main game file
BlockDodgeGame.prototype.update = function(gamespeed)
{ 
	this.updateBase(gamespeed); //Keep this
	
	this.updateChar(gamespeed);
	this.updateEnemy(gamespeed);
	
	this.checkCollisions();
	//INCLUDE GAME UPDATE METHOD HERE
	//Note: the base game square class already handles the arrow keys, and
	//      you can access them by the booleans this.canvas._up, this.canvas._down, this.canvas._left, and this.canvas._right
	//
	//      when true the key is down, and when false the key is up
}

//Setting the update function that is called from the main game file
BlockDodgeGame.prototype.draw = function()
{
	this.clear(); //Keep this
	this.drawBase(); //Keep this
	
	this.drawEnemy();
	this.drawChar();
	
	//INCLUDE GAME DRAW METHOD HERE
} 

// ************************************************************************ 
// STATIC PROPERTIES -- ANYONE MAY READ/WRITE 
// ************************************************************************ 
BlockDodgeGame.BlockWidth = 4;
BlockDodgeGame.BlockHeight = 4;
BlockDodgeGame.BlockSpawnRate = 10; //lower is better
BlockDodgeGame.BlockSpeed = 2;
	
//Speed for the character
BlockDodgeGame.PlayerSpeed = 2;
BlockDodgeGame.PlayerWidth = 10;
BlockDodgeGame.PlayerHeight = 10;

BlockDodgeGame.InvincibilityIteration = 8;
BlockDodgeGame.InvincibilityDuration = 10; //iterations