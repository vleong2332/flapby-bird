(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var flapbyBird = require('./game');

document.addEventListener('DOMContentLoaded', function() {
	var app = new flapbyBird.FlapbyBird();
	app.run();
});
},{"./game":7}],2:[function(require,module,exports){
// Component declaration
// Will initialized when created in entity
var BirdGraphicsComponent = function(entity) {
	// Tag which entity this component belongs to
	this.entity = entity;
};

// Declare draw()
// Will be called by systems
// Access syntax: (BirdGraphicsComponent).draw()
BirdGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    context.arc(0, 0, 0.02, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();
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
var PhysicsComponent = function(entity) {
	this.entity = entity;
	this.position = {
		x:0,
		y:0
	};
	this.velocity = {
		x:0,
		y:0
	};
	this.acceleration = {
		x:0,
		y:0
	};
};

PhysicsComponent.prototype.update = function(delta) {
	this.velocity.x += this.acceleration.x * delta;
	this.velocity.y += this.acceleration.y * delta;

	this.position.x += this.velocity.x * delta;
	this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],5:[function(require,module,exports){
// Include components needed
var graphicsComponent = require('../components/graphics/bird');
var physicsComponent = require('../components/physics/physics');

// Create Bird entity
var Bird = function() {
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 0.5;
	physics.acceleration.y = -1.5;

	// Initialize components
	var graphics = new graphicsComponent.BirdGraphicsComponent(this);
	// Storing components in one object.
	// Acess syntax will be (entity).components.(component)
	this.components = {
		graphics: graphics,
		physics: physics
	};
};

exports.Bird = Bird;
},{"../components/graphics/bird":2,"../components/physics/physics":4}],6:[function(require,module,exports){
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
},{"../components/graphics/pipe":3}],7:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlapbyBird = function() {
	this.entities = [new bird.Bird(), new pipe.Pipe()];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.input = new inputSystem.InputSystem(this.entities);
};

FlapbyBird.prototype.run = function() {
	this.graphics.run();
	this.physics.run();
	this.input.run();
};

exports.FlapbyBird = FlapbyBird;
},{"./entities/bird":5,"./entities/pipe":6,"./systems/graphics":8,"./systems/input":9,"./systems/physics":10}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
var InputSystem = function(entities) {
	this.entities = entities;

	// Canvas is where we get input from
	this.canvas = document.getElementById('main-canvas');
};

		InputSystem.prototype.run = function() {
			this.canvas.addEventListener('click', this.onClick.bind(this));
			this.canvas.addEventListener('touchstart', this.onClick.bind(this));
		};

		InputSystem.prototype.onClick = function() {
			var bird = this.entities[0];
			bird.components.physics.velocity.y = 0.6;
		};

exports.InputSystem = InputSystem;
},{}],10:[function(require,module,exports){
// System declaration - will be called in game.
var PhysicsSystem = function(entities) {
	// Tag which entity the system belongs to
	this.entities = entities;
};

// Declare run() - will be called in game when game is called
PhysicsSystem.prototype.run = function() {
	// Run the render loop
	window.setInterval(this.tick.bind(this), 1000/60);
};

// tick() declaration
PhysicsSystem.prototype.tick = function() {
	// Rendering goes here
	// Go through all the entities
	for (var i = 0; i < this.entities.length; i++) {
		var entity = this.entities[i];
		// Check to see if an entity has graphics component
		if (!('physics' in entity.components)) {
			// Skip to the next entity if it doesn't have graphics component
			continue;
		}
		// Call draw() if it has graphics component
		entity.components.physics.update(1/60);
	}
};


exports.PhysicsSystem = PhysicsSystem;
},{}]},{},[1]);
