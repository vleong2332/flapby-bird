(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var flapbyBird = require('./game');

document.addEventListener('DOMContentLoaded', function() {
	var app = new flapbyBird.FlapbyBird();
	app.run();
});
},{"./game":6}],2:[function(require,module,exports){
// Component declaration
// Will initialized when created in entity
var BirdGraphicsComponent = function(entity) {
	// Tag which entity this component belongs to
	this.entity = entity;
	// Thinkful starting point
	this.thinkStartx = 150;
	this.thinkStarty = 30;
	// Circle starting point
	this.radius           = 20;
	this.startx            = this.thinkStartx + (1.5*this.radius);
	this.starty            = this.thinkStarty + (0.5*this.radius);
	this.posx              = this.startx;
	this.posy              = this.starty;
	this.lineThickness     = this.radius;
	this.circleMovingState = "down";
	this.loop              = 0; //Even loop = going up; Odd loop = going down
};

// Declare draw()
// Will be called by systems
// Access syntax: (BirdGraphicsComponent).draw()
BirdGraphicsComponent.prototype.draw = function(context) {
	context.beginPath();
	// Modify circle moving direction depending on coordinates
	// Top left hole
	if ((this.posx == this.startx) && (this.posy == this.starty)) {
			this.circleMovingState = "down";
			this.loop++;
	}
	// Top right side of T
	else if ((this.posx == this.startx) && (this.posy == this.starty+20)) {
		if (this.loop % 2)
			this.circleMovingState = "left";
		else
			this.circleMovingState = "up";
	}
	// Top middle of T
	else if ((this.posx == this.startx-60) && (this.posy == this.starty+20)) {
		if (this.loop % 2)
			this.circleMovingState = "down";
		else
			this.circleMovingState = "right";
	}
	// Bottom middle of T
	else if ((this.posx == this.startx-60) && (this.posy == this.starty+140)) {
		if (this.loop % 2)
			this.circleMovingState = "left";
		else
			this.circleMovingState = "up";
	}
	// Bottom left hole
	else if ((this.posx == this.startx-80) && (this.posy == this.starty+140)) {
		this.circleMovingState = "right";
		this.loop++;
	}

	// Move circle depending on the state
	switch (this.circleMovingState) {
		case "down":
			context.arc(this.posx, this.posy++, this.radius, 0, 2 * Math.PI);
			break;
		case "up":
			context.arc(this.posx, this.posy--, this.radius, 0, 2 * Math.PI);
			break;
		case "left":
			context.arc(this.posx--, this.posy, this.radius, 0, 2 * Math.PI);
			break;
		case "right":
			context.arc(this.posx++, this.posy, this.radius, 0, 2 * Math.PI);
			break;
		default:
			break;
	}
	context.fillStyle = 'rgb(100, 0, 0)';
	context.fill();

	// Thinkful logo
	context.lineWidth = this.lineThickness;
	context.lineCap = 'square';
	context.beginPath();
	context.moveTo(this.thinkStartx, this.thinkStarty);
	context.lineTo(this.thinkStartx-120, this.thinkStarty);
	context.lineTo(this.thinkStartx-120, this.thinkStarty+60);
	context.lineTo(this.thinkStartx-60,  this.thinkStarty+60);
	context.lineTo(this.thinkStartx-60,  this.thinkStarty+120);
	context.strokeStyle = "blue";
	context.stroke();
	context.closePath();

	context.beginPath();
	context.moveTo(this.thinkStartx-60, this.thinkStarty+180);
	context.lineTo(this.thinkStartx,    this.thinkStarty+180);
	context.lineTo(this.thinkStartx,    this.thinkStarty+60);
	context.lineTo(this.thinkStartx+60, this.thinkStarty+60);
	context.lineTo(this.thinkStartx+60, this.thinkStarty);
	context.stroke();
	context.closePath();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],3:[function(require,module,exports){
// Component declaration
// Will initialized when created in entity
var PipeGraphicsComponent = function(entity) {
	// Tag which entity this component belongs to
	this.entity = entity;
};

// Declare draw()
// Will be called by systems
// Access syntax (BirdGraphicsComponent).draw()
PipeGraphicsComponent.prototype.draw = function() {
	console.log("Drawing a pipe");
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],4:[function(require,module,exports){
// Include components needed
var graphicsComponent = require('../components/graphics/bird');

// Create Bird entity
var Bird = function() {
	console.log("Creating Bird entity");

	// Initialize components
	var graphics = new graphicsComponent.BirdGraphicsComponent(this);
	// Storing components in one object.
	// Acess syntax will be (entity).components.(component)
	this.components = {
		graphics: graphics
	};
};

exports.Bird = Bird;
},{"../components/graphics/bird":2}],5:[function(require,module,exports){
// Include components needed
var graphicsComponent = require('../components/graphics/pipe');

// Create Pipe entity
var Pipe = function() {
	console.log("Creating Pipe entity");

	// Initialize components
	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	// Storing components in one object.
	// Acess syntax will be (entity).components.(component)
	this.components = {
		graphics: graphics
	};
};

exports.Pipe = Pipe;
},{"../components/graphics/pipe":3}],6:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlapbyBird = function() {
	this.entities = [new bird.Bird(), new pipe.Pipe()];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
};

FlapbyBird.prototype.run = function() {
	this.graphics.run();
};

exports.FlapbyBird = FlapbyBird;
},{"./entities/bird":4,"./entities/pipe":5,"./systems/graphics":7}],7:[function(require,module,exports){
// System declaration - will be called in game.
var GraphicsSystem = function(entities) {
	// Tag which entity the system belongs to
	this.entities = entities;
	this.canvas = document.getElementById('main-canvas');
	this.context = this.canvas.getContext('2d');
};



// Declare run() - will be called in game when game is called
GraphicsSystem.prototype.run = function() {
	// Run the render loop
	window.requestAnimationFrame(this.tick.bind(this));
};



// tick() declaration
GraphicsSystem.prototype.tick = function() {
	// Set the canvas to the window size when resized
	if (this.canvas.width != this.canvas.offsetWidth ||
		this.canvas.height  != this.canvas.offsetHeight) {
		this.canvas.width  = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;
	}

	// Clear the canvas
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.save();
	// Origin is at the middle bottom of the screen
	this.context.translate(this.canvas.width / 2, this.canvas.height);
	this.context.scale(this.canvas.height, -this.canvas.height);

	// Rendering goes here
	// Go through all the entities
	for (var i = 0; i < this.entities.length; i++) {
		var entity = this.entities[i];
		// Check to see if an entity has graphics component
		if (!('graphics' in entity.components)) {
			// Skip to the next entity if it doesn't have graphics component
			continue;
		}
		// Call draw() if it has graphics component
		entity.components.graphics.draw(this.context);
	}

	this.context.restore();

	// Continue the render loop - calls this function again
	window.requestAnimationFrame(this.tick.bind(this));
};



exports.GraphicsSystem = GraphicsSystem;
},{}]},{},[1]);
