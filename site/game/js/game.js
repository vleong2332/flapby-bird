//
// Required by main.js
//
var graphicsSystem = require('./systems/graphics'),
		physicsSystem  = require('./systems/physics'),
		inputSystem    = require('./systems/input'),
		bird           = require('./entities/bird'),
		pipe           = require('./entities/pipe'),
		ground         = require('./entities/ground'),
		ceiling        = require('./entities/ceiling'),
		eater          = require('./entities/pipeEater'),
		keeper         = require('./entities/scoreKeeper');

// FlapbyBird is the main function for the game. It starts and stops the game.
// FlapbyBird
//  |_ entities[]
//  |_ graphics
//  |_ physics
//  |_ input
//  |_ run()
//  |_ pause() *not implemented
//  |_ reset() *not implemented

var FlapbyBird = function() {
	// Array containing graphical entities on the canvas
	this.entities = [new eater.Eater(), new keeper.Keeper(), new bird.Bird(),
									 new ground.Ground(), new ceiling.Ceiling()];
	// Various system that handle the array
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics  = new physicsSystem.PhysicsSystem(this.entities);
	this.input    = new inputSystem.InputSystem(this.entities);
};

		//
		// Function: run graphics, physics, and input system
		//
		FlapbyBird.prototype.run = function() {
			// Execute each system's run function
			this.graphics.run();
			this.physics.run();
			this.input.run();
		};


exports.FlapbyBird = FlapbyBird;