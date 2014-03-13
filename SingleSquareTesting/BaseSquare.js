//BaseSquare is the base class for a square that will contain a game. If you want to increase square size, change the static variables at the bottom of the page.
//I copied the format of the classes from this website:
//http://phrogz.net/JS/classes/OOPinJS.html

//Main constructor for the gamesquare
function BaseSquare(gameCanvas, gameCanvasContext, newx, newy){ 

	// ************************************************************************ 
	// PRIVILEGED METHODS 
	// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS 
	// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS 
	// ************************************************************************ 
	
	//KeyDown function
	//Note: Pretty silly, but the this._left somehow sets the variable inside the canvas
	this.doBaseKeyDown=function(e){
		if ( e.keyCode == 37 ) { //Left
			this._left = true;
		}
		if ( e.keyCode == 38 ) { //Up
			this._up = true;
		}
		if ( e.keyCode == 39 ) { //Right
			this._right = true;
		}
		if ( e.keyCode == 40 ) { //Down
			this._down = true;
		}
	}

	//KeyUp function
	this.doBaseKeyUp=function(e){
		if ( e.keyCode == 37 ) { //Left
			this._left = false;
		}
		if ( e.keyCode == 38 ) { //Up
			this._up = false;
		}
		if ( e.keyCode == 39 ) { //Right
			this._right = false;
		}
		if ( e.keyCode == 40 ) { //Down
			this._down = false;
		}
	}
	
	//Clear the current square's location
	this.clear = function() {
		this.context.clearRect(this.canvasX, this.canvasY, BaseSquare.SquareWidth, BaseSquare.SquareHeight);
	}

	//Draws the timer on the square
	this.drawTime = function() {
		//Draw remaining time
		this.context.fillStyle = "rgba(255, 0, 0, 0.5)";
		this.context.fillRect(this.canvasX, this.canvasY, BaseSquare.SquareWidth / BaseSquare.MaxTime * this.time, 10);
		
		//Draw empty bar
		this.context.fillStyle = "rgba(100, 100, 100, 0.5)";
		this.context.fillRect(this.canvasX + BaseSquare.SquareWidth / BaseSquare.MaxTime * this.time, this.canvasY, BaseSquare.SquareWidth - (BaseSquare.SquareWidth / BaseSquare.MaxTime * this.time), 10);
	}

	//Draws the shaded overlay when unfocused
	this.drawFocus = function() {
		if(!this._focus)
		{
			this.context.fillStyle = "rgba(0, 0, 0, 0.3)";
			this.context.fillRect(this.canvasX, this.canvasY, BaseSquare.SquareWidth, BaseSquare.SquareHeight);
		}
	}
	
	//Update base - not sure if necessary
	this.updateBase=function(gamespeed){ 
	} 
	
	this.drawBase=function(){
		this.clear();
		//If you want a default background for all gamesquares, put it here
	}
	
	this.actionSuccess=function(){
		//Add the time back on the timer
		this.time += BaseSquare.TimeAdd;
		if(this.time > BaseSquare.MaxTime) this.time = BaseSquare.MaxTime;
	}
	
	this.actionFailure=function(){
		//Subtract the time from the timer
		this.time -= BaseSquare.TimeSubtract;
		if(this.time < 0) this.time = 0;
	}

	// ************************************************************************ 
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE 
	// ************************************************************************ 
	
	this.canvasX=newx; //x location of the square on the canvas
	this.canvasY=newy; //y location of the square on the canvas
	
	this._focus = false; //Focus - when true, it will be the active square
	
	this.time = 100; //100 max
	
	this.canvas=gameCanvas;
	this.context=gameCanvasContext;
} 

// ************************************************************************ 
// PUBLIC METHODS -- ANYONE MAY READ/WRITE 
// ************************************************************************ 
BaseSquare.prototype.update = function(gamespeed){ this.updateBase(gamespeed); } 
BaseSquare.prototype.draw = function(){ this.clear(); this.drawBase(); }
BaseSquare.prototype.drawFocus = function(){ this.drawFocus(); }
BaseSquare.prototype.drawTime = function(){ this.drawTime(); }

// ************************************************************************ 
// STATIC PROPERTIES -- ANYONE MAY READ/WRITE 
// ************************************************************************ 
BaseSquare.SquareWidth = 200; //CHANGE THIS TO INCREASE SQUARE SIZE
BaseSquare.SquareHeight = 200; //CHANGE THIS TO INCREASE SQUARE SIZE

BaseSquare.TimeAdd = 20; //CHANGE THIS TO INCREASE REWARD VALUE
BaseSquare.TimeSubtract = .1; //CHANGE THIS TO DECREASE REWARD VALUE

BaseSquare.MaxTime = 100;