//
// Required by game.js --> main.js
//
var graphicsComponent  = require('../components/graphics/ceiling'),
		physicsComponent   = require('../components/physics/physics'),
		collisionComponent = require('../components/collision/rect.js');

//
// Ceiling
//  |_ size{}
//  |   |_ x
//  |   |_ y
//  |_ components{}
//      |_ graphics
//      |_ physics
//      |_ collision
//

var Ceiling = function() {
	this.size = {
		x: (document.getElementById('main-canvas').width)/100,
		y: 0.001
	};

	// Building components
	var graphics  = new graphicsComponent.CeilingGraphicsComponent(this);
	var physics   = new physicsComponent.PhysicsComponent(this);
	var collision = new collisionComponent.RectCollisionComponent(this, this.size);
	
	// Setting components
	physics.position.x = -1;
	physics.position.y = 1;

	// Framing components
	this.components = {
		graphics: graphics,
		physics:  physics,
		collision: collision
	};
};


exports.Ceiling = Ceiling;