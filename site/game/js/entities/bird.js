//
// Required by game.js --> main.js
//             collision.js
//
var graphicsComponent  = require('../components/graphics/bird'),
		physicsComponent   = require('../components/physics/physics'),
		collisionComponent = require('../components/collision/circle');

//
// Bird
//  |_ components{}
//      |_ radius
//			|_ components{}
//      |   |_ graphics
//      |   |_ physics
//      |   |_ collision
//      |_ onCollision(entity)
//

var Bird = function() {
	this.radius = 0.02;
	// Building up components
	var graphics  = new graphicsComponent.BirdGraphicsComponent(this);
	var physics   = new physicsComponent.PhysicsComponent(this);
	var collision = new collisionComponent.CircleCollisionComponent(this, this.radius);
	physics.position.y     = 0.5; // Starts at the center
	physics.acceleration.y = -1.75; // Falling rate
	// Add bird's onCollision event to the collision component
	// but 'this' will refer to the bird, instead of the component itself
	collision.onCollision = this.onCollision.bind(this);
	
	// Frame the components
	this.components = {
		graphics:  graphics,
		physics:   physics,
		collision: collision
	};
};

	//
	// Function: Describe what happens when the bird collides with some other entity
	//
	Bird.prototype.onCollision = function(entity) {
		console.log('Bird collided with entity:', entity);
		// Reset bird's position and acceleration
		this.components.physics.position.y     = 0.5;
		this.components.physics.velocity.y     = 0;
		this.components.physics.acceleration.y = -1.75;
	};


exports.Bird = Bird;