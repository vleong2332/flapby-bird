var graphicsSystem  = require('./systems/graphics'),
	 physicsSystem   = require('./systems/physics'),
	 inputSystem     = require('./systems/input'),
	 scoreSystem     = require('./systems/score'),
	 collisionSystem = require('./systems/collision'),
	 bird            = require('./entities/bird'),
	 pipe            = require('./entities/pipe'),
	 ground          = require('./entities/ground'),
	 ceiling         = require('./entities/ceiling'),
	 eater           = require('./entities/pipeEater'),
	 keeper          = require('./entities/scoreKeeper');

// FlapbyBird is the main function for the game. It starts and stops the game.
// FlapbyBird
//  |_ state
//  |_ entities[]
//  |_ input
//  |_ score
//  |_ graphics
//  |_ collision
//  |_ physics
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
	this.input     = new inputSystem.InputSystem();
	this.score     = new scoreSystem.ScoreSystem();
	this.graphics  = new graphicsSystem.GraphicsSystem();
	this.collision = new collisionSystem.CollisionSystem();
	this.physics   = new physicsSystem.PhysicsSystem();
	
	// Assigning entities array to the systems to be managed
	this.input.entities     = this.entities;
	this.graphics.entities  = this.entities;
	this.collision.entities = this.entities;
	this.physics.entities   = this.entities;

	// Link the systems to share info
	this.collision.graphicsSystem = this.graphics;
	this.collision.physicsSystem  = this.physics;
	this.physics.collisionSystem  = this.collision;
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
	// Function: Run graphics, physics, and input system
	//
	FlapbyBird.prototype.run = function() {
		// Execute each system's run function
		this.graphics.run();
		this.physics.run();
		this.input.run();
		this.state = 1;
	};

	//
	// Function: Pause graphics and pyhsics system
	//
	FlapbyBird.prototype.pause = function() {
		this.graphics.pause();
		this.physics.pause();
		this.state = 2;
	};

	//
	// Function: Resume graphics and physics system
	//
	FlapbyBird.prototype.resume = function() {
		this.graphics.run();
		this.physics.resume();
		this.state = 1;
	};


exports.FlapbyBird = FlapbyBird;