//
// Required by main.js
//
var graphicsSystem = require('./systems/graphics'),
		physicsSystem  = require('./systems/physics'),
		inputSystem    = require('./systems/input'),
		scoreSystem    = require('./systems/score'),
		bird           = require('./entities/bird'),
		pipe           = require('./entities/pipe'),
		ground         = require('./entities/ground'),
		ceiling        = require('./entities/ceiling'),
		eater          = require('./entities/pipeEater'),
		keeper         = require('./entities/scoreKeeper');

// FlapbyBird is the main function for the game. It starts and stops the game.
// FlapbyBird
//  |_ state
//  |_ entities[]
//  |_ graphics
//  |_ physics
//  |_ input
//  |_ score
//  |_ init()
//  |_ run()
//  |_ pause()
//  \_ resume()

var FlapbyBird = function() {
	this.state = 0; // 0-idle, 1-running, 2-paused
	// Array containing graphical entities on the canvas
	this.entities = [new eater.Eater(), new keeper.Keeper(), new bird.Bird(),
									 new ground.Ground(), new ceiling.Ceiling()];
	// Various system that handle the array
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics  = new physicsSystem.PhysicsSystem(this.entities);
	this.input    = new inputSystem.InputSystem(this.entities);
	this.score    = new scoreSystem.ScoreSystem();
};

	//
	// Function: Set the game for play
	//
	FlapbyBird.prototype.init = function() {
		this.graphics.init();
		this.score.updateScore();
		this.state = 0;
	};

	//
	// Function: run graphics, physics, and input system
	//
	FlapbyBird.prototype.run = function() {
		// Execute each system's run function
		this.graphics.run();
		this.physics.run();
		this.input.run();
		this.state = 1;
	};

	//
	// Function:
	//
	FlapbyBird.prototype.pause = function() {
		this.graphics.pause();
		this.physics.pause();
		this.state = 2;
	};

	//
	// Function:
	//
	FlapbyBird.prototype.resume = function() {
		this.graphics.run();
		this.physics.resume();
		this.state = 1;
	};


exports.FlapbyBird = FlapbyBird;