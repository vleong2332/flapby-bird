//
// Required by entities/bird.js
//             entities/ceiling.js
//             entities/ground.js
//             entities/pipe.js
//             entities/pipeEater.js
//             entities/scoreKeeper.js
//

//
// PhysicsComponent
//  |_ entity
//  |_ position{}
//  |   |_ x
//  |   \_ y
//  |_ velocity{}
//  |   |_ x
//  |   \_ y
//  \_ acceleration{}
//      |_ x
//      \_ y
//

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

	//
	// Function: Modifies the physics every so often
	// Based on Euler Integrator
	//
	PhysicsComponent.prototype.update = function(delta) {
		this.velocity.x += this.acceleration.x * delta;
		this.velocity.y += this.acceleration.y * delta;
		this.position.x += this.velocity.x * delta;
		this.position.y += this.velocity.y * delta;
	};


exports.PhysicsComponent = PhysicsComponent;