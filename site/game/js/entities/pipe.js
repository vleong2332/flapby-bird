//
// Required by game.js --> main.js
//             collision.js
//             graphics.js
//
var graphicsComponent  = require('../components/graphics/pipe'),
		physicsComponent   = require('../components/physics/physics'),
		collisionComponent = require('../components/collision/rect.js');

//
// Pipe
// |_ size{}
// |   |_ x
// |   \_ y
// \_ components{}
//     |_ graphics
//     |_ physics
//     \_ collision
//

var Pipe = function(loc, height) {
	this.size = {
		x: 0.2, // SETTING
		y: height
 	};
	
	// Building components
	var graphics  = new graphicsComponent.PipeGraphicsComponent(this);
	var physics   = new physicsComponent.PhysicsComponent(this);
	var collision = new collisionComponent.RectCollisionComponent(this, this.size);

	// Configure components
	physics.position.x = 1;
	physics.position.y = (loc === "upper") ? 1 : 0;
	physics.velocity.x -= 0.365;

	// Framing components
	this.components = {
		graphics: graphics,
		physics:  physics,
		collision: collision
	};
};

	//
	// Function: *empty
	//
	Pipe.prototype.onCollision = function(entity) {
	
	};


exports.Pipe = Pipe;