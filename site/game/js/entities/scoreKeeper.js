//
//	Required by game.js --> main.js
//						  collision.js
//
var graphicsComponent  = require('../components/graphics/scoreKeeper'),
		physicsComponent   = require('../components/physics/physics'),
		collisionComponent = require('../components/collision/rect.js');

//
// Keeper
//  |_ size{}
//  |   |_ x
//  |   \_ y
//  \_ components{}
//      |_ graphics
//      |_ physics
//      \_ collision
//

var Keeper = function(loc, height) {
	this.size = {
		x: 0.001,
		y: 1
	};

	// Build components
	var graphics = new graphicsComponent.KeeperGraphicsComponent(this);
	var physics  = new physicsComponent.PhysicsComponent(this);
	var collision = new collisionComponent.RectCollisionComponent(this, this.size);

	// Configure components
	collision.onCollision = this.onCollision.bind(this);
	physics.position.x = -0.2;
	physics.position.y = 0;
	
	// Pack components
	this.components = {
		graphics:  graphics,
		physics:   physics,
		collision: collision
	};
};


	//
	// Function: *empty, but needed so collision system don't skip this
	//
	Keeper.prototype.onCollision = function(entity) {

	};

exports.Keeper = Keeper;