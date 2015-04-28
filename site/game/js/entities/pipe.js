var graphicsComponent = require('../components/graphics/pipe');
var physicsComponent  = require('../components/physics/physics');

var Pipe = function() {
	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = document.getElementById('main-canvas').offsetWidth/1000;
	physics.position.y = 0;


	this.components = {
		graphics: graphics,
		physics: physics
	};
};

exports.Pipe = Pipe;