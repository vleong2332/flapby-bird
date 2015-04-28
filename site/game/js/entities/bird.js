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