//Example1Game.js displays a square bouncing around inside the square. Displays the use of the update and draw functions.

//Set test game to inherit from the base game square
Example1Game.prototype = new BaseSquare();

//Make sure it recognizes its type as testgame
Example1Game.prototype.constructor=Example1Game;

//Main constructor for the game - copies the variable initializations from the base square game
function Example1Game(gameCanvas, gameCanvasContext, newx, newy){
	
	//Keep these
	this.canvas=gameCanvas;
	this.context=gameCanvasContext;
	
	//Keep these
	this.canvasX=newx;
	this.canvasY=newy;
	
	//Custom private variables to track the inner bouncing square
	var squareX = 5;//location
	var squareY = 10;
	var squareW = 10;//width/height
	var squareH = 10;
	
	var squareVX = 4;//Velocities
	var squareVY = 5;
	
	this.time = 100;
	
	//Set up the keydown function
	this.canvas.addEventListener( "keydown", this.doBaseKeyDown, true);

	//Set up the keyup function
	this.canvas.addEventListener( "keyup", this.doBaseKeyUp, true);
	
	//Function to update the bouncing square
	this.updateSquare=function(gamespeed){
		//Add the speed to the square, taking into account the gamespeed
		squareX += squareVX * gamespeed / 100;
		squareY += squareVY * gamespeed / 100;
		
		//Make sure it stays within the bounds of the square
		if(squareX <= 0)
		{
			squareX = 0;
			squareVX *= -1;
		}
		
		if(squareX + squareW >= BaseSquare.SquareWidth)
		{
			squareX = BaseSquare.SquareWidth - squareW;
			squareVX *= -1;
		}
		
		if(squareY <= 0)
		{
			squareY = 0;
			squareVY *= -1;
		}
		
		if(squareY + squareH >= BaseSquare.SquareHeight)
		{
			squareY = BaseSquare.SquareHeight - squareH;
			squareVY *= -1;
		}
		
		if(this.canvas._up)
			this.time = 0;
	} 

	//Draw the bouncing square
	this.drawSquare=function(){
		this.context.fillStyle = "#F00";
		this.context.fillRect(this.canvasX  + squareX, this.canvasY  + squareY, squareW, squareH);
	}
}

//Setting the update function that is called from the main game file
Example1Game.prototype.update = function(gamespeed)
{ 
	this.updateBase(gamespeed); //Keep this
	
	this.updateSquare(gamespeed);
} 

//Setting the draw function that is called from the main game file
Example1Game.prototype.draw = function()
{
	this.clear(); //Keep this
	this.drawBase(); //Keep this
	
	this.drawSquare();
} 