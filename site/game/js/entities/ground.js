//
// Required by game.js --> main.js
//
var graphicsComponent  = require('../components/graphics/ground'),
		physicsComponent   = require('../components/physics/physics'),
		collisionComponent = require('../components/collision/rect.js');

var Ground = function() {
	this.size = {
		x: (document.getElementById('main-canvas').width)/100,
		y: 0.001
 	};
 	
	// Building components
	var graphics = new graphicsComponent.GroundGraphicsComponent(this);
	var physics  = new physicsComponent.PhysicsComponent(this);
	var collision = new collisionComponent.RectCollisionComponent(this, this.size);
	
	// Setting components
	physics.position.x = -1;
	physics.position.y = 0;

	// Framing components in one object
	this.components = {
		graphics: graphics,
		physics:  physics,
		collision: collision
	};
};

exports.Ground = Ground;