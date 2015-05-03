(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var flapbyBird = require('./game');

// Run Flapby Bird game when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
	var app = new flapbyBird.FlapbyBird();
	app.init();

	//
	var playInstruction = document.getElementById('play-instruction');
	playInstruction.addEventListener('click', function() {
		app.run();
	});

	// Bind space key to pause and resume the game
	document.addEventListener('keydown', function(event) {
		if (event.keyCode == 32) {
			if (app.state == 1) {app.pause();}
			else if (app.state == 2) {app.resume();}
		}
	});

	//
	var continueButton = document.getElementById('continue');
	continueButton.addEventListener('click', function() {
		app.resume();
	});

});
},{"./game":17}],2:[function(require,module,exports){
//
// CircleCollisionComponent
//  |_ entity
//  |_ radius
//  |_ type
//  |_ collidesWith
//  |_ collideCircle
//  \_ collideRect
//

var CircleCollisionComponent = function(entity, radius) {
	this.entity = entity;
	this.radius = radius;
	this.type   = 'circle';
};

	//
	// Function: Check for collision based on type of entities
	//
	CircleCollisionComponent.prototype.collidesWith = function(entity) {
		if (entity.components.collision.type == 'circle') {
			return this.collideCircle(entity);
		}
		else if (entity.components.collision.type == 'rect') {
			return this.collideRect(entity);
		}
		return false;
	};

	//
	// Function: Handles circle-circle collision
	//
	CircleCollisionComponent.prototype.collideCircle = function (entity) {
		var positionA = this.entity.components.physics.position, // This circle object
				positionB = entity.components.physics.position, // The other circle object
				diff      = {
					x: positionA.x - positionB.x,
					y: positionA.y - positionB.y
				};
		//
		var radiusA   = this.radius,
				radisuB   = entity.components.collision.radius,
				radiusSum = radiusA + radiusB;				
		//
		var distanceSquared = diff.x*diff.x + diff.y*diff.y;
		
		return (distanceSquared < radiusSum*radiusSum);
	};

	//
	// Function: Handles circle-rectangle collision
	//
	CircleCollisionComponent.prototype.collideRect = function (entity) {
		var positionA = this.entity.components.physics.position,
				positionB = entity.components.physics.position,
				sizeB     = entity.components.collision.size,
				radiusA   = this.radius;
		var centerB = {
			x: positionB.x + sizeB.x / 2,
			y: (positionB.y == 1) ? (positionB.y - sizeB.y / 2) : (positionB.y + sizeB.y / 2)
		};
		var clamp = function(val, lo, hi) {
			if (val < lo) {return lo;}
			if (val > hi) {return hi;}
			return val;
		};
		var closest = {
			x: clamp(positionA.x,
							 centerB.x - (sizeB.x/2),
							 centerB.x + (sizeB.x/2)),
			y: clamp(positionA.y,
							 centerB.y - (sizeB.y/2),
							 centerB.y + (sizeB.y/2))
		};
		var diff = {
								 x: positionA.x - closest.x,
								 y: positionA.y - closest.y
							 };
		
		var distanceSquared = diff.x*diff.x + diff.y*diff.y;
		
		return distanceSquared < radiusA*radiusA;
	};


exports.CircleCollisionComponent = CircleCollisionComponent;
},{}],3:[function(require,module,exports){
//
// RectCollisionComponent
//  |_ entity
//  |_ size
//  |_ type
//  |_ collidesWith
//  |_ collideCircle
//  \_ collideRect
//

var RectCollisionComponent = function(entity, size) {
	this.entity = entity;
	this.size   = size;
	this.type   = 'rect';
};

	//
	// Function: Check for collision
	//
	RectCollisionComponent.prototype.collidesWith = function(entity) {
		if (entity.components.collision.type == 'circle') {
			return this.collideCircle(entity);
		}
		else if (entity.components.collision.type == 'rect') {
			return this.collideRect(entity);
		}
		return false;
	};

	//
	// Function: Handles rectangle-circle collision
	//
	RectCollisionComponent.prototype.collideCircle = function(entity) {
		// Let the circle handles the collision
		return entity.components.collision.collideRect(this.entity);
	};

	//
	// Function: Handles rectangle-rectangle collision
	//
	RectCollisionComponent.prototype.collideRect = function (entity) {
		var positionA = this.entity.components.physics.position,
				positionB = entity.components.physics.position,
				sizeA = this.size,
				sizeB = entity.components.collision.size;
		//		
		var centerA = {
					x: positionA.x + sizeB.x / 2,
					y: (positionA.y == 1) ? (positionA.y - sizeA.y / 2) : (positionA.y + sizeA.y / 2)
				},
				centerB = {
					x: positionB.x + sizeB.x / 2,
					y: (positionB.y == 1) ? (positionB.y - sizeB.y / 2) : (positionB.y + sizeB.y / 2)
				};
		//
		var leftA   = centerA.x - (sizeA.x/2),
				rightA  = centerA.x + (sizeA.x/2),
				topA    = centerA.y + (sizeA.y/2),
				bottomA = centerA.y - (sizeA.y/2),
				leftB   = centerB.x - (sizeB.x/2),
				rightB  = centerB.x + (sizeB.x/2),
				topB    = centerB.y + (sizeB.y/2),
				bottomB = centerB.y - (sizeB.y/2);
		//
		return !(leftA   > rightB || leftB   > rightA ||
						 bottomA > topB   || bottomB > topA);
	};


exports.RectCollisionComponent = RectCollisionComponent;
},{}],4:[function(require,module,exports){
//
// BirdGraphicsComponent
//  |_ entity
//  \_ draw()
//

var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

    //
    // Function: Draw a circle on canvas
    //
    BirdGraphicsComponent.prototype.draw = function(context) {
        var position = this.entity.components.physics.position;

        context.save();
        context.translate(position.x, position.y);
        context.beginPath();
        context.arc(0, 0, 0.02, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
        context.restore();
    };


exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],5:[function(require,module,exports){
//
// CeilingGraphicsComponent
//  |_ entity
//  \_ draw()
//

var CeilingGraphicsComponent = function(entity) {
	this.entity = entity;
};

	//
	// Function: Draw rectangle on canvas
	//
	CeilingGraphicsComponent.prototype.draw = function(context) {
		var position = this.entity.components.physics.position,
				width    = this.entity.size.x,
				height   = this.entity.size.y;
		//
		context.save();
		context.fillStyle = '#650000';
	  context.fillRect(position.x, position.y, width, -height);
	  context.restore();
	};


exports.CeilingGraphicsComponent = CeilingGraphicsComponent;
},{}],6:[function(require,module,exports){
//
// GroundGraphicsComponent
//  |_ entity
//  \_ draw()
//

var GroundGraphicsComponent = function(entity) {
	this.entity = entity;
};

	//
	// Function: Draw rectangle on canvas
	//
	GroundGraphicsComponent.prototype.draw = function(context) {
		var position = this.entity.components.physics.position,
				width    = this.entity.size.x,
				height   = this.entity.size.y;
		//
		context.save();
		context.fillStyle = '#000';
	  context.fillRect(position.x, position.y, width, height);
	  context.restore();
	};


exports.GroundGraphicsComponent = GroundGraphicsComponent;
},{}],7:[function(require,module,exports){
//
// PipeGraphicsComponent
//  |_ entity
//  \_ draw()
//

var PipeGraphicsComponent = function(entity) {
	this.entity = entity;
};

		PipeGraphicsComponent.prototype.draw = function(context) {
			var position = this.entity.components.physics.position,
					width    = this.entity.size.x,
					height   = this.entity.size.y;
			//
			context.save();
			context.fillStyle = '#006500';
		  context.fillRect(position.x, position.y, width, (position.y == 1 ? -height : height));
		  context.restore();
		};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],8:[function(require,module,exports){
//
// EaterGraphicsComponent
//  |_ entity
//  \_ draw()
//

var EaterGraphicsComponent = function(entity) {
	this.entity = entity;
};

	//
	// Function: Draw invisible shape on canvas
	//	
	EaterGraphicsComponent.prototype.draw = function(context) {
		var position = this.entity.components.physics.position,
				width    = this.entity.size.x,
				height   = this.entity.size.y;
		//
		context.save();
		context.fillStyle = 'rgba(0,0,0,0)';
	  context.fillRect(position.x, position.y, width, height);
	  context.restore();
	};


exports.EaterGraphicsComponent = EaterGraphicsComponent;
},{}],9:[function(require,module,exports){
//
// KeeperGraphicsComponent
//  |_ entity
//  \_ draw()
//

var KeeperGraphicsComponent = function(entity) {
	this.entity = entity;
};

	//
	// Function: Draw invisible shape on canvas
	//
	KeeperGraphicsComponent.prototype.draw = function(context) {
		var position = this.entity.components.physics.position,
				width    = this.entity.size.x,
				height   = this.entity.size.y;
		//
		context.save();
		context.fillStyle = 'rgba(0,0,0,0)';
	  context.fillRect(position.x, position.y, width, height);
	  context.restore();
	};


exports.KeeperGraphicsComponent = KeeperGraphicsComponent;
},{}],10:[function(require,module,exports){
//
// Required by entities/bird.js
//             entities/ceiling.js
//             entities/ground.js
//             entities/pipe.js
//             entities/pipeEater.js
//             entities/scoreKeeper.js
//

//
// PhysicsComponent
//  |_ entity
//  |_ position{}
//  |   |_ x
//  |   \_ y
//  |_ velocity{}
//  |   |_ x
//  |   \_ y
//  \_ acceleration{}
//      |_ x
//      \_ y
//

var PhysicsComponent = function(entity) {
	this.entity = entity;
	this.position = {
		x:0,
		y:0
	};
	this.velocity = {
		x:0,
		y:0
	};
	this.acceleration = {
		x:0,
		y:0
	};
};

	//
	// Function: Modifies the physics every so often
	// Based on Euler Integrator
	//
	PhysicsComponent.prototype.update = function(delta) {
		this.velocity.x += this.acceleration.x * delta;
		this.velocity.y += this.acceleration.y * delta;
		this.position.x += this.velocity.x * delta;
		this.position.y += this.velocity.y * delta;
	};


exports.PhysicsComponent = PhysicsComponent;
},{}],11:[function(require,module,exports){
//
// Required by game.js --> main.js
//             collision.js
//
var graphicsComponent  = require('../components/graphics/bird'),
		physicsComponent   = require('../components/physics/physics'),
		collisionComponent = require('../components/collision/circle');

//
// Bird
//  |_ radius
//	|_ components{}
//  |   |_ graphics
//  |   |_ physics
//  |   \_ collision
//  \_ onCollision(entity)
//

var Bird = function() {
	this.radius = 0.02;

	// Building up components
	var graphics  = new graphicsComponent.BirdGraphicsComponent(this);
	var physics   = new physicsComponent.PhysicsComponent(this);
	var collision = new collisionComponent.CircleCollisionComponent(this, this.radius);

	// Setting components
	physics.position.y     = 0.5; // Starts at the center
	physics.acceleration.y = -1.75; // Falling rate
	// Add bird's onCollision event to the collision component
	// but 'this' will refer to the bird, instead of the component itself
	collision.onCollision = this.onCollision.bind(this);
	
	// Frame the components
	this.components = {
		graphics:  graphics,
		physics:   physics,
		collision: collision
	};
};

	//
	// Function: Describe what happens when the bird collides with some other entity
	//
	Bird.prototype.onCollision = function(entity) {
		console.log('Bird collided with entity:', entity);
		// Reset bird's position and acceleration
		this.components.physics.position.y     = 0.5;
		this.components.physics.velocity.y     = 0;
		this.components.physics.acceleration.y = -1.75;
	};


exports.Bird = Bird;
},{"../components/collision/circle":2,"../components/graphics/bird":4,"../components/physics/physics":10}],12:[function(require,module,exports){
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
//  |   \_ y
//  \_ components{}
//      |_ graphics
//      |_ physics
//      \_ collision
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
	physics.position.x = -1.2;
	physics.position.y = 1;

	// Framing components
	this.components = {
		graphics: graphics,
		physics:  physics,
		collision: collision
	};
};


exports.Ceiling = Ceiling;
},{"../components/collision/rect.js":3,"../components/graphics/ceiling":5,"../components/physics/physics":10}],13:[function(require,module,exports){
//
// Required by game.js --> main.js
//
var graphicsComponent  = require('../components/graphics/ground'),
		physicsComponent   = require('../components/physics/physics'),
		collisionComponent = require('../components/collision/rect.js');

//
// Ground
//  |_ size{}
//  |   |_ x
//  |   |_ y
//  \_ components{}
//      |_ graphics
//      |_ physics
//      \_ collision
//

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
	physics.position.x = -1.2;
	physics.position.y =  0;

	// Framing components in one object
	this.components = {
		graphics: graphics,
		physics:  physics,
		collision: collision
	};
};


exports.Ground = Ground;
},{"../components/collision/rect.js":3,"../components/graphics/ground":6,"../components/physics/physics":10}],14:[function(require,module,exports){
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
},{"../components/collision/rect.js":3,"../components/graphics/pipe":7,"../components/physics/physics":10}],15:[function(require,module,exports){
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
},{"../components/collision/rect.js":3,"../components/graphics/pipeEater":8,"../components/physics/physics":10}],16:[function(require,module,exports){
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
},{"../components/collision/rect.js":3,"../components/graphics/scoreKeeper":9,"../components/physics/physics":10}],17:[function(require,module,exports){
//
// Required by main.js
//
var graphicsSystem = require('./systems/graphics'),
		physicsSystem  = require('./systems/physics'),
		inputSystem    = require('./systems/input'),
		scoreSystem    = require('./systems/score'),
		bird           = require('./entities/bird'),
		pipe           = require('./entities/pipe'),
		ground         = require('./entities/ground'),
		ceiling        = require('./entities/ceiling'),
		eater          = require('./entities/pipeEater'),
		keeper         = require('./entities/scoreKeeper');

// FlapbyBird is the main function for the game. It starts and stops the game.
// FlapbyBird
//  |_ state
//  |_ entities[]
//  |_ graphics
//  |_ physics
//  |_ input
//  |_ score
//  |_ init()
//  |_ run()
//  |_ pause()
//  \_ resume()

var FlapbyBird = function() {
	this.state = 0; // 0-idle, 1-running, 2-paused
	// Array containing graphical entities on the canvas
	this.entities = [new eater.Eater(), new keeper.Keeper(), new bird.Bird(),
									 new ground.Ground(), new ceiling.Ceiling()];
	// Various system that handle the array
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics  = new physicsSystem.PhysicsSystem(this.entities);
	this.input    = new inputSystem.InputSystem(this.entities);
	this.score    = new scoreSystem.ScoreSystem();
};

	//
	// Function: Set the game for play
	//
	FlapbyBird.prototype.init = function() {
		this.graphics.init();
		this.score.updateScore();
		this.state = 0;
	};

	//
	// Function: run graphics, physics, and input system
	//
	FlapbyBird.prototype.run = function() {
		// Execute each system's run function
		this.graphics.run();
		this.physics.run();
		this.input.run();
		this.state = 1;
	};

	//
	// Function:
	//
	FlapbyBird.prototype.pause = function() {
		this.graphics.pause();
		this.physics.pause();
		this.state = 2;
	};

	//
	// Function:
	//
	FlapbyBird.prototype.resume = function() {
		this.graphics.run();
		this.physics.resume();
		this.state = 1;
	};


exports.FlapbyBird = FlapbyBird;
},{"./entities/bird":11,"./entities/ceiling":12,"./entities/ground":13,"./entities/pipe":14,"./entities/pipeEater":15,"./entities/scoreKeeper":16,"./systems/graphics":19,"./systems/input":20,"./systems/physics":21,"./systems/score":22}],18:[function(require,module,exports){
//
// Required by physics.js --> game.js --> main.js
//
var graphicsSystem = require ('./graphics'),
		scoreSystem    = require ('./score'),
		eater          = require ('../entities/pipeEater'),
		pipe           = require ('../entities/pipe'),
		bird           = require ('../entities/bird'),
		keeper         = require ('../entities/scoreKeeper');

//
// CollisionSystem handles the what happens if collision between two entity occurs
// CollisionSystem(entities)
//  |_ entities[]
//  |_ graphicsSystem
//  |_ scoreSystem
//  \_ tick()

var CollisionSystem = function(entities) {
	this.entities = entities;
	this.graphicsSystem = new graphicsSystem.GraphicsSystem(entities);
	this.scoreSystem = new scoreSystem.ScoreSystem();
};

		//
		// Function: Check for collisions every tick.
		// This runs right after physics' tick = check for collision after every move
		//
		CollisionSystem.prototype.tick = function() {
			// Goes through each entity in the list
			for (var i=0; i<this.entities.length; i++) {
				var entityA = this.entities[i];
				// Skip to the next if entity doesn't have any components
				if (!('collision' in entityA.components)) {
					continue;
				}
				// Goes through the next entities to compare
				for (var j=i+1; j<this.entities.length; j++) {
					var entityB = this.entities[j];
					// Skip to the next if entity doesn't have any components
					if (!('collision' in entityB.components)) {
						continue;
					}
					// Check for collision between the two entities, skip to the next if none detected
					if (!entityA.components.collision.collidesWith(entityB)) {
						continue;
					}
					// If collision is detected and if entity has a collition handler
					if (entityA.components.collision.onCollision) {
						// Call the entity's own collision handler
						entityA.components.collision.onCollision(entityB);
						
						// If the entity is a bird...
						if (entityA instanceof bird.Bird) {
							// Remove all drawn pipes
							this.graphicsSystem.deleteAllPipes();
							// Reset score
							this.scoreSystem.resetScore();
						}
					
						// If pipeEater collides with pipes, delete that pipes
						if (entityA instanceof eater.Eater && entityB instanceof pipe.Pipe) {
							this.graphicsSystem.deleteLastTwoPipes();
						}
						
						// Update score if scoreKeeper collides with pipe
						if (entityA instanceof keeper.Keeper && entityB instanceof pipe.Pipe) {
							this.scoreSystem.countScore();
						}
					}
					// If collision is detected and the second entity has collision handler...
					if (entityB.components.collision.onCollision) {
						// Call the second entity's own collition handler
						entityB.components.collision.onCollision(entityA);
					}
				}
			}
		};


exports.CollisionSystem = CollisionSystem;
},{"../entities/bird":11,"../entities/pipe":14,"../entities/pipeEater":15,"../entities/scoreKeeper":16,"./graphics":19,"./score":22}],19:[function(require,module,exports){
//
//	Required by game.js --> main.js
//
var pipe = require('../entities/pipe');

// Graphics System is responsible for putting visuals on the canvas
// GraphicsSystem(entities)
//  |_ entities[]
//  |_ canvas
//  |_ context
//  |_ animFrame
//  |_ pipeCreation
//  |_ run()
//  |_ pause()
//  |_ tick()
//  |_ createNewPipes()
//  |   |_ minGap
//  |   |_ maxGap
//  |   |_ gap
//  |   |_ buffer
//  |   |_ ttlHeight
//  |   |_ uprHeight
//  |   |_ lwrHeight
//  |   |_ upperPipe
//  |   \_ lowerPipe
//  |_ deleteAllPipes()
//  |_ deleteLastTwoPipes()
//  |_ updateScore(score, hiScore)
//  \_ drawGrid(gap, times)
//

var GraphicsSystem = function(entities) {
	this.entities = entities;
	this.canvas   = document.getElementById('main-canvas');
	this.context  = this.canvas.getContext('2d');
	this.animFrame = 0; // Will contained ID returned by requestAnimationFrame()
	this.pipeCreation = 150; // Indicates how many ticks between creating new pipes
};

	//
	// Function: Initialize the first tick
	//
	GraphicsSystem.prototype.init = function() {
		this.tick.bind(this);
		this.tick(1); // Indicate initialization. Only run tick one time.
	};

	//
	// Function: Run the graphics system
	// 
	GraphicsSystem.prototype.run = function() {
		// Execute one tick of GraphicsSystem before the next paint cycle
		// There are normally 60 paint cycles in 1 second
		this.animFrame = window.requestAnimationFrame(this.tick.bind(this));
		document.getElementById('pause-overlay').className = "hidden";
		document.getElementById('play-instruction').className = "hidden";
	};

	//
	// Function:
	//
	GraphicsSystem.prototype.pause = function() {
		window.cancelAnimationFrame(this.animFrame);
		document.getElementById('pause-overlay').className = "";
	};

	//
	// Function: Execute all GraphicsSystem activities in one tick
	//
	GraphicsSystem.prototype.tick = function(init) {
		// Ensure drawing area is the same as canvas area even when resize
		if (this.canvas.width   != this.canvas.offsetWidth ||
			  this.canvas.height  != this.canvas.offsetHeight) {
			this.canvas.width  = this.canvas.offsetWidth;
			this.canvas.height = this.canvas.offsetHeight;
		}

		// Reset the canvas at every tick
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		// Save a clean state of the canvas
		this.context.save();
		// Put the origin at the bottom middle
		this.context.translate(this.canvas.width/2, this.canvas.height);
		// Flipped the canvas so that y positive points up
		// and maintain the aspect ratio of the coordinates
		this.context.scale(this.canvas.height, -this.canvas.height);
		
		// Dawing grid below the entities
		// Uncomment to see
		//this.drawGrid();

		// Create new pipes every so often
		if (--this.pipeCreation === 0) {
			this.createNewPipes();
			this.pipeCreation = 150;
		}

		// Go through each entity in the list
		for (var i = 0; i < this.entities.length; i++) {
			var entity = this.entities[i];
			// Skip to the next one if there is no graphics component present
			if (!('graphics' in entity.components)) {
				continue;
			}
			// If there is graphic component, execute it's draw()
			entity.components.graphics.draw(this.context);
		}

		// Dawing grid on top of the entities
		// Uncomment to see
		//this.drawGrid();

		// Restore the canvas to the clean state
		this.context.restore();
		// Execute another tick of GraphicsSystem
		// This will create an infinite execution since the next one calls the next and that
		// calls the next and so on
		// If it's initial tick, don't recall this function
		if (init != 1) {
			this.animFrame = window.requestAnimationFrame(this.tick.bind(this));
		}
	};

	//
	// Function: Create one pair of pipes with random gap size
	//
	GraphicsSystem.prototype.createNewPipes = function() {
		var minGap    = 0.15, // SETTING
				maxGap    = 0.45, // SETTING
				gap       = Math.random() * (maxGap - minGap) + minGap,
				buffer    = 0.1,
				ttlHeight = 1 - buffer - gap,
				uprHeight = buffer + (Math.random() * (ttlHeight - buffer) + buffer),
				lwrHeight = buffer + (ttlHeight - uprHeight),
				upperPipe = new pipe.Pipe('upper', uprHeight),
				lowerPipe = new pipe.Pipe('lower', lwrHeight);
		// Insert the two pipes into the list of entities starting at the 4th position
		// The first three entities in the lists are eater, keeper, and bird.
		this.entities.splice(3, 0, upperPipe, lowerPipe);
	};

	//
	// Function: Remove all pipes from the canvas
	//
	GraphicsSystem.prototype.deleteAllPipes = function() {
		// Remove all entities minus 5 starting from the fourth position
		// The first 3 entities are eater, keeper, and bird
		// The last 2 entities are ground and ceiling
		this.entities.splice(3, (this.entities.length-5));
	};

	//
	// Function: Remove a pair of pipes
	//
	GraphicsSystem.prototype.deleteLastTwoPipes = function() {
		// Remove the last two pipes in the list of entities
		this.entities.splice((this.entities.length-4), 2);
	};

	//
	// Function: Draw grid based on given gap size and how many lines should be drawn
	//
	GraphicsSystem.prototype.drawGrid = function(gap, times) {
		this.gap   = gap   || 0.1;
		this.times = times || 10;
		// this.context.save();
		this.context.lineWidth = 0.001;
		this.context.beginPath();
		for (var i = 0; i < (this.gap*this.times); i += this.gap) {
			// Positive y
			this.context.moveTo(-this.gap*this.times, i);
			this.context.lineTo( this.gap*this.times, i);
			// Negative y
			this.context.moveTo(-this.gap*this.times, -i);
			this.context.lineTo( this.gap*this.times, -i);
			// Positive x
			this.context.moveTo(i, -this.gap*this.times);
			this.context.lineTo(i,  this.gap*this.times);
			// Negative x
			this.context.moveTo(-i, -this.gap*this.times);
			this.context.lineTo(-i,  this.gap*this.times);		
		}
		this.context.strokeStyle = "#AAA";
		this.context.stroke();
		// this.context.restore();
	};




exports.GraphicsSystem = GraphicsSystem;
},{"../entities/pipe":14}],20:[function(require,module,exports){
//
// Required by game.js --> main.js
//

//
// InputSystem handles all events triggered by the user
// InputSystem(entities)
//  |_ entities[]
//  |_ canvas
//  |_ overlay
//  |_ run()
//  \_ flap()

var InputSystem = function(entities) {
	this.entities = entities;
	this.canvas   = document.getElementById('main-canvas');
	this.overlay  = document.getElementById('overlay');
};

		//
		// Function: Run Input System
		//
		InputSystem.prototype.run = function() {
			// Bind click and touch event handlers to the canvas
			this.canvas.addEventListener('click',       this.flap.bind(this));
			this.canvas.addEventListener('touchstart',  this.flap.bind(this));
			this.overlay.addEventListener('click',      this.flap.bind(this));
			this.overlay.addEventListener('touchstart', this.flap.bind(this));
		};

		//
		// Function: Executes when user click on canvas
		//
		InputSystem.prototype.flap = function() {
			// Bird is the third entity
			var bird = this.entities[2];
			// Make the bird jumps by changing it's velocity upwards
			bird.components.physics.velocity.y = 0.6; // SETTING
		};


exports.InputSystem = InputSystem;
},{}],21:[function(require,module,exports){
//
// Required by game.js --> main.js
//
var collisionSystem = require('./collision');

//
// PhysicsSystem updates physics components of entities. It runs in sync with CollisionSystem.
// PhysicsSystem
//  |_ entities[]
//  |_ collisionSystem
//  |_ run()
//  |_ pause()
//  |_ resume()
//  \_ tick()

var PhysicsSystem = function(entities) {
	this.entities = entities;
	this.collisionSystem = new collisionSystem.CollisionSystem(entities);
	this.physicsTick = 0;
};

		//
		// Function: Run the Physics System
		//
		PhysicsSystem.prototype.run = function() {
			// Make one tick every 1/60 second which results in 60 fps
			this.physicsTick = new setTimer(this.tick.bind(this), 1000/60);
		};

		//
		// Function: Pause the physics ticks
		//
		PhysicsSystem.prototype.pause = function() {
			this.physicsTick.pause();
		};

		//
		// Function: Resume physics ticks
		//
		PhysicsSystem.prototype.resume = function() {
			this.physicsTick.resume();
		};

		//
		// Function: Execute all PhysicsSystem activities in one tick
		//
		PhysicsSystem.prototype.tick = function() {
			// Go through the list of entity
			for (var i = 0; i < this.entities.length; i++) {
				var entity = this.entities[i];
				// Skip to the next entity if there is no physics component
				if (!('physics' in entity.components)) {
					continue;
				}
				// If there is physics component, call its update()
				entity.components.physics.update(1/60);
			}

			// Also run the CollisionSystem's tick
			// This way, both systems are synced
			this.collisionSystem.tick();
		};


exports.PhysicsSystem = PhysicsSystem;
},{"./collision":18}],22:[function(require,module,exports){
//
// Required by collision.js
//

//
// ScoreSystem interacts with the game and Local Storage API
// ScoreSystem
//  |_ points
//  |_ score
//  |_ hiScore
//  |_ countScore()
//  |_ resetScore()
//  |_ updateScore()
//  |_ loadHiScore()
//  \_ saveHiScore()
//

var ScoreSystem = function() {
	this.points  = 0;
	this.score   = 0;
	this.hiScore = this.loadHiScore();
};

	//
	// Function: Turn points into score
	//
	ScoreSystem.prototype.countScore = function() {
		this.points++;
		if (this.points % 66 === 0) {
			this.score++;
		}
		// Set high score
		if (this.score > this.hiScore) {
			this.hiScore = this.score;
			this.saveHiScore();
		}
		this.updateScore();
	};

	//
	// Function: Reset score to 0
	//
	ScoreSystem.prototype.resetScore = function() {
		this.points = 0;
		this.score  = 0;
		this.updateScore();
	};

	//
	// Function: Reflect the score on the game
	//
	ScoreSystem.prototype.updateScore = function() {
		document.getElementById('score').innerHTML    = this.score;
		document.getElementById('hi-score').innerHTML = this.hiScore;
	};

	//
	// Function: Try to get previously stored hiScore
	//
	ScoreSystem.prototype.loadHiScore = function() {
		if (Modernizr.localstorage) {
			return parseInt(window.localStorage.getItem('hiScore')) || 0;
		}
		else {
			console.log("Local Storage is not available with in this browser. High Score cannot be loaded.");
			return 0;
		}
	};

	//
	// Function: Store hiScore in Local Storage
	//
	ScoreSystem.prototype.saveHiScore = function() {
		if (Modernizr.localstorage) {
			window.localStorage.setItem('hiScore', this.hiScore);
		}
		else {
			console.log("Local Storage is not available with in this browser. High Score cannot be saved.");
		}
	};


exports.ScoreSystem = ScoreSystem;
},{}]},{},[1]);
