/*
	Required by game.js --> main.js
						  graphics.js
*/

var graphicsComponent  = require('../components/graphics/ceiling');
var physicsComponent   = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect.js');

var Ceiling = function(loc, height) {
	//
	var graphics = new graphicsComponent.CeilingGraphicsComponent(this);
	var physics  = new physicsComponent.PhysicsComponent(this);
	physics.position.x = -1;
	physics.position.y = 1;
	//
	this.size = {
								x: 2,
								y: 0.01
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

exports.Ceiling = Ceiling;