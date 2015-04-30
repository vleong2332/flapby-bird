/*
	Required by game.js --> main.js
						  graphics.js
*/

var graphicsComponent  = require('../components/graphics/pipe');
var physicsComponent   = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect.js');

var Pipe = function(loc, height) {
	//
	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	var physics  = new physicsComponent.PhysicsComponent(this);
	physics.position.x = 1;
	physics.position.y = (loc === "upper") ? 1 : 0;
	physics.acceleration.x -= 0.1;
	//
	this.size = {
								x: 0.2,
								y: height
						 };
	//
	var collision = new collisionComponent.RectCollisionComponent(this, this.size);
	//
	this.components = {
		graphics: graphics,
		physics:  physics,
		collision: collision
	};
};

		Pipe.prototype.onCollision = function(entity) {
			console.log('Pipe collided with entity:', entity);
			// Remove Pipe
		};


exports.Pipe = Pipe;