/* Required by game.js --> main.js */

var graphicsComponent  = require('../components/graphics/bird');
var physicsComponent   = require('../components/physics/physics');
var collisionComponent = require('../components/collision/circle');

var Bird = function() {
	//
	var graphics  = new graphicsComponent.BirdGraphicsComponent(this);
	var physics   = new physicsComponent.PhysicsComponent(this);
	physics.position.y     = 0.5;
	physics.acceleration.y = -1.75;
	//
	var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
	collision.onCollision = this.onCollision.bind(this);
	//
	this.components = {
		graphics:  graphics,
		physics:   physics,
		collision: collision
	};
};

		Bird.prototype.onCollision = function(entity) {
			console.log('Bird collided with entity:', entity);
			// Reset physics
			this.components.physics.position.y     = 0.5;
			this.components.physics.velocity.y     = 0;
			this.components.physics.acceleration.y = -1.75;
		};

exports.Bird = Bird;