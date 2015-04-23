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
};

// Declare draw()
// Will be called by systems
// Access syntax (BirdGraphicsComponent).draw()
BirdGraphicsComponent.prototype.draw = function() {
	console.log("Drawing a bird");
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
};

// Declare run() - will be called in game when game is called
GraphicsSystem.prototype.run = function() {
	// Tick the graphics systems a few times to see it in action
	for (var i = 0; i < 5; i++) {
		this.tick();
	}
};

// tick() declaration
GraphicsSystem.prototype.tick = function() {
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
};

exports.GraphicsSystem = GraphicsSystem;
},{}]},{},[1]);
