var graphicsComponent = require('../components/graphics/pipe');
var physicsComponent  = require('../components/physics/physics');

var Pipe = function(loc, height) {
	//
	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	var physics  = new physicsComponent.PhysicsComponent(this);
	//
	this.width    = 0.2;
	this.height   = height;
	//
	physics.position.x = 1;
	physics.position.y = (loc === "upper") ? 1 : 0;
	physics.acceleration.x -= 0.1;
	//
	this.components = {
		graphics: graphics,
		physics:  physics
	};
};

exports.Pipe = Pipe;