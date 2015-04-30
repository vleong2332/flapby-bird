/*
	Required by game.js --> main.js
						  graphics.js
*/

var graphicsComponent  = require('../components/graphics/scoreKeeper');
var physicsComponent   = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect.js');

var Keeper = function(loc, height) {
	//
	var graphics = new graphicsComponent.KeeperGraphicsComponent(this);
	var physics  = new physicsComponent.PhysicsComponent(this);
	physics.position.x = -0.2;
	physics.position.y = 0;
	//
	this.size = {
								x: 0.001,
								y: 1
						 };
	//
	var collision = new collisionComponent.RectCollisionComponent(this, this.size);
	collision.onCollision = this.onCollision.bind(this);
	//
	this.components = {
		graphics:  graphics,
		physics:   physics,
		collision: collision
	};
};


		Keeper.prototype.onCollision = function(entity) {
			// Remove Pipe
		};

exports.Keeper = Keeper;