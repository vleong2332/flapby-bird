/* Required by main.js */

var graphicsSystem = require('./systems/graphics');
var physicsSystem  = require('./systems/physics');
var inputSystem    = require('./systems/input');
var bird           = require('./entities/bird');
var pipe           = require('./entities/pipe');
var ground         = require('./entities/ground');
var ceiling        = require('./entities/ceiling')

var FlapbyBird = function() {
	//
	this.entities = [new bird.Bird(), new ground.Ground(), new ceiling.Ceiling()];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics  = new physicsSystem.PhysicsSystem(this.entities);
	this.input    = new inputSystem.InputSystem(this.entities);
};

		// Run graphics, physics, and input system
		FlapbyBird.prototype.run = function() {
			this.graphics.run();
			this.physics.run();
			this.input.run();
		};

exports.FlapbyBird = FlapbyBird;