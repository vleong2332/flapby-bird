//
//	Required by game.js --> main.js
//              collision.js
//
var graphicsComponent  = require('../components/graphics/pipeEater'),
		physicsComponent   = require('../components/physics/physics'),
		collisionComponent = require('../components/collision/rect.js');

//
// When pipes collide with Eater, graphicsSystem.deleteLastTwoPipes() is triggered
// Eater
//  |_ size{}
//  |   |_ x
//  |   \_ y
//  \_ components{}
//      |_ graphics
//      |_ physics
//      \_ collision
//

var Eater = function(loc, height) {
	this.size = {
		x: 0.0001,
		y: 1
 	};

	// Building components
	var graphics  = new graphicsComponent.EaterGraphicsComponent(this);
	var physics   = new physicsComponent.PhysicsComponent(this);
	var collision = new collisionComponent.RectCollisionComponent(this, this.size);

	// Configuring components
	physics.position.x = -1.5;
	physics.position.y = 0;

	// Packaging components
	this.components = {
		graphics:  graphics,
		physics:   physics,
		collision: collision
	};
};


exports.Eater = Eater;