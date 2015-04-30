(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var flapbyBird = require('./game');

// Run Flapby Bird game when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
	var app = new flapbyBird.FlapbyBird();
	app.run();
});
},{"./game":17}],2:[function(require,module,exports){
var CircleCollisionComponent = function(entity, radius) {
	this.entity = entity;
	this.radius = radius;
	this.type   = 'circle';
};


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
			//
			return (distanceSquared < radiusSum*radiusSum);
		};

		//
		CircleCollisionComponent.prototype.collideRect = function (entity) {
			var clamp = function(val, lo, hi) {
				if (val < lo) {
					return lo;
				}
				if (val > hi) {
					return hi;
				}
				return val;
			};
			//
			var positionA = this.entity.components.physics.position,
					positionB = entity.components.physics.position,
					sizeB     = entity.components.collision.size,
					radiusA   = this.radius;
			var center = {
											x: positionB.x + sizeB.x / 2,
											y: (positionB.y == 1) ? (positionB.y - sizeB.y / 2) : (positionB.y + sizeB.y / 2)
									 };
			//
			var closest = {
											x: clamp(positionA.x,
															 center.x - (sizeB.x/2),
															 center.x + (sizeB.x/2)),
											y: clamp(positionA.y,
															 center.y - (sizeB.y/2),
															 center.y + (sizeB.y/2))
										};
			var diff = {
									 x: positionA.x - closest.x,
									 y: positionA.y - closest.y
								 };
			//
			var distanceSquared = diff.x*diff.x + diff.y*diff.y;
			//
			return distanceSquared < radiusA*radiusA;
		};


	exports.CircleCollisionComponent = CircleCollisionComponent;
},{}],3:[function(require,module,exports){
var RectCollisionComponent = function(entity, size) {
	this.entity = entity;
	this.size   = size;
	this.type   = 'rect';
};

		RectCollisionComponent.prototype.collidesWith = function(entity) {
			if (entity.components.collision.type == 'circle') {
				return this.collideCircle(entity);
			}
			else if (entity.components.collision.type == 'rect') {
				return this.collideRect(entity);
			}
			return false;
		};

		RectCollisionComponent.prototype.collideCircle = function(entity) {
			return entity.components.collision.collideRect(this.entity);
		};

		RectCollisionComponent.prototype.collideRect = function (entity) {
			var positionA = this.entity.components.physics.position,
					positionB = entity.components.physics.position,
					sizeA = this.size,
					sizeB = entity.components.collision.size;

			var centerA = {
											x: positionA.x + sizeB.x / 2,
											y: (positionA.y == 1) ? (positionA.y - sizeA.y / 2) : (positionA.y + sizeA.y / 2)
									 };

			var centerB = {
											x: positionB.x + sizeB.x / 2,
											y: (positionB.y == 1) ? (positionB.y - sizeB.y / 2) : (positionB.y + sizeB.y / 2)
									 };

			var leftA   = centerA.x - (sizeA.x/2),
					rightA  = centerA.x + (sizeA.x/2),
					topA    = centerA.y + (sizeA.y/2),
					bottomA = centerA.y - (sizeA.y/2);
			//
			var leftB   = centerB.x - (sizeB.x/2),
					rightB  = centerB.x + (sizeB.x/2),
					topB    = centerB.y + (sizeB.y/2),
					bottomB = centerB.y - (sizeB.y/2);
			//
			return !(leftA   > rightB || leftB   > rightA ||
							 bottomA > topB   || bottomB > topA);
		};


exports.RectCollisionComponent = RectCollisionComponent;
},{}],4:[function(require,module,exports){
// Component declaration
// Will initialized when created in entity
var BirdGraphicsComponent = function(entity) {
    // Tag which entity this component belongs to
    this.entity = entity;
};

// Declare draw()
// Will be called by systems
// Access syntax: (BirdGraphicsComponent).draw()
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
var CeilingGraphicsComponent = function(entity) {
	this.entity = entity;
};

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
var GroundGraphicsComponent = function(entity) {
	this.entity = entity;
};

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
var EaterGraphicsComponent = function(entity) {
	this.entity = entity;
};

		EaterGraphicsComponent.prototype.draw = function(context) {
			var position = this.entity.components.physics.position,
					width    = this.entity.size.x,
					height   = this.entity.size.y;
			//
			context.save();
			context.fillStyle = '#000';
		  context.fillRect(position.x, position.y, width, height);
		  context.restore();
		};

exports.EaterGraphicsComponent = EaterGraphicsComponent;
},{}],9:[function(require,module,exports){
var KeeperGraphicsComponent = function(entity) {
	this.entity = entity;
};

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

		PhysicsComponent.prototype.update = function(delta) {
			this.velocity.x += this.acceleration.x * delta;
			this.velocity.y += this.acceleration.y * delta;

			this.position.x += this.velocity.x * delta;
			this.position.y += this.velocity.y * delta;
		};

exports.PhysicsComponent = PhysicsComponent;
},{}],11:[function(require,module,exports){
/*
	Required by game.js --> main.js 
*/

var graphicsComponent  = require('../components/graphics/bird');
var physicsComponent   = require('../components/physics/physics');
var collisionComponent = require('../components/collision/circle');
var graphicsSystem     = require('../systems/graphics');

var Bird = function() {
	//
	var graphics  = new graphicsComponent.BirdGraphicsComponent(this);
	var physics   = new physicsComponent.PhysicsComponent(this);
	physics.position.y     = 0.5;
	physics.acceleration.y = -1.75;
	//
	var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
	collision.onCollision = this.onCollision.bind(this);
	//
	this.components = {
		graphics:  graphics,
		physics:   physics,
		collision: collision
	};
};

		Bird.prototype.onCollision = function(entity) {
			console.log('Bird collided with entity:', entity);
			// Reset physics
			this.components.physics.position.y     = 0.5;
			this.components.physics.velocity.y     = 0;
			this.components.physics.acceleration.y = -1.75;
		};

exports.Bird = Bird;
},{"../components/collision/circle":2,"../components/graphics/bird":4,"../components/physics/physics":10,"../systems/graphics":19}],12:[function(require,module,exports){
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
},{"../components/collision/rect.js":3,"../components/graphics/ceiling":5,"../components/physics/physics":10}],13:[function(require,module,exports){
/*
	Required by game.js --> main.js
						  graphics.js
*/

var graphicsComponent  = require('../components/graphics/ground');
var physicsComponent   = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect.js');

var Ground = function(loc, height) {
	//
	var graphics = new graphicsComponent.GroundGraphicsComponent(this);
	var physics  = new physicsComponent.PhysicsComponent(this);
	physics.position.x = -1;
	physics.position.y = 0;
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

exports.Ground = Ground;
},{"../components/collision/rect.js":3,"../components/graphics/ground":6,"../components/physics/physics":10}],14:[function(require,module,exports){
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
},{"../components/collision/rect.js":3,"../components/graphics/pipe":7,"../components/physics/physics":10}],15:[function(require,module,exports){
/*
	Required by game.js --> main.js
						  graphics.js
*/

var graphicsComponent  = require('../components/graphics/pipeEater');
var physicsComponent   = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect.js');

var Eater = function(loc, height) {
	//
	var graphics = new graphicsComponent.EaterGraphicsComponent(this);
	var physics  = new physicsComponent.PhysicsComponent(this);
	physics.position.x = -1.5;
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


		Eater.prototype.onCollision = function(entity) {
			// Remove Pipe
		};

exports.Eater = Eater;
},{"../components/collision/rect.js":3,"../components/graphics/pipeEater":8,"../components/physics/physics":10}],16:[function(require,module,exports){
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
},{"../components/collision/rect.js":3,"../components/graphics/scoreKeeper":9,"../components/physics/physics":10}],17:[function(require,module,exports){
/* Required by main.js */

var graphicsSystem = require('./systems/graphics');
var physicsSystem  = require('./systems/physics');
var inputSystem    = require('./systems/input');
var bird           = require('./entities/bird');
var pipe           = require('./entities/pipe');
var ground         = require('./entities/ground');
var ceiling        = require('./entities/ceiling');
var eater          = require('./entities/pipeEater');
var keeper         = require('./entities/scoreKeeper');

var FlapbyBird = function() {
	//
	this.entities = [new eater.Eater(), new keeper.Keeper(), new bird.Bird(), new ground.Ground(), new ceiling.Ceiling()];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics  = new physicsSystem.PhysicsSystem(this.entities);
	this.input    = new inputSystem.InputSystem(this.entities);
};

		// Run graphics, physics, and input system
		FlapbyBird.prototype.run = function() {
			this.graphics.run();
			this.physics.run();
			this.input.run();
		};

exports.FlapbyBird = FlapbyBird;
},{"./entities/bird":11,"./entities/ceiling":12,"./entities/ground":13,"./entities/pipe":14,"./entities/pipeEater":15,"./entities/scoreKeeper":16,"./systems/graphics":19,"./systems/input":20,"./systems/physics":21}],18:[function(require,module,exports){
var graphicsSystem = require ('./graphics');
var eater          = require ('../entities/pipeEater');
var pipe          = require ('../entities/pipe');
var bird          = require ('../entities/bird');
var keeper        = require ('../entities/scoreKeeper');

var CollisionSystem = function(entities) {
	this.entities = entities;
	this.graphicsSystem = new graphicsSystem.GraphicsSystem(entities);
	this.points  = 0;
	this.score   = 0;
	this.hiScore = 0;
};

		CollisionSystem.prototype.tick = function() {
			for (var i=0; i<this.entities.length; i++) {
				var entityA = this.entities[i];
				if (!('collision' in entityA.components)) {
					continue;
				}
				//
				for (var j=i+1; j<this.entities.length; j++) {
					var entityB = this.entities[j];
					
					if (!('collision' in entityB.components)) {
						continue;
					}

					// Skip to next iteration if no collition is detected
					if (!entityA.components.collision.collidesWith(entityB)) {
						continue;
					}

					// If collision is detected and if entity has a collition handlre
					if (entityA.components.collision.onCollision) {
						// Call the entity's own collision handler
						entityA.components.collision.onCollision(entityB);

						// If bird hits anything...
						if (entityA instanceof bird.Bird) {
							// Remove all drawn pipes
							this.graphicsSystem.deleteAllPipes();
							// Set high score
							if (this.score > this.hiScore) this.hiScore = this.score;
							// Reset score
							this.score = 0;
							this.points = 0;
							document.getElementById('score').innerHTML = this.score;
							document.getElementById('hi-score').innerHTML = this.hiScore;
						}

						// Remove pipes that went out of screen if pipeEater collides with pipe
						if (entityA instanceof eater.Eater && entityB instanceof pipe.Pipe) {
							console.log (entityA, 'collides with', entityB);
							this.graphicsSystem.deleteLastTwoPipes();
						}

						// Update score if scoreKeeper collides with pipe
						if (entityA instanceof keeper.Keeper && entityB instanceof pipe.Pipe) {
							this.points++;
							if (!(this.points % 50)) {
								this.score++;
								document.getElementById('score').innerHTML = this.score;
							}
						}
					}
					// If collision is detected and the second entity has 
					if (entityB.components.collision.onCollision) {
						// Call the second entity's own collition handler if there is any
						entityB.components.collision.onCollision(entityA);
					}
				}
			}
		};

exports.CollisionSystem = CollisionSystem;
},{"../entities/bird":11,"../entities/pipe":14,"../entities/pipeEater":15,"../entities/scoreKeeper":16,"./graphics":19}],19:[function(require,module,exports){
/* Required by game.js --> main.js */

var pipe = require('../entities/pipe');

var GraphicsSystem = function(entities) {
	//
	this.entities = entities;
	this.canvas   = document.getElementById('main-canvas');
	this.context  = this.canvas.getContext('2d');
	//
	this.createNewPipes = function() {
		var minGap    = 0.2,
				maxGap    = 0.5,
				gap       = Math.random() * (maxGap - minGap) + minGap,
				buffer    = 0.1,
				ttlHeight = 1 - buffer - gap,
				uprHeight = buffer + (Math.random() * (ttlHeight - buffer) + buffer),
				lwrHeight = buffer + (ttlHeight - uprHeight);
		//
		var upperPipe = new pipe.Pipe('upper', uprHeight),
				lowerPipe = new pipe.Pipe('lower', lwrHeight);
		//
		this.entities.splice(3, 0, upperPipe, lowerPipe);
	};
	this.deleteAllPipes = function() {
		// Reset game by deleting all pipes entites and create a new one
		this.entities.splice(3, (this.entities.length-5));
	};
	this.deleteLastTwoPipes = function() {
		// Remove the last two pipes that gone through the screen
		this.entities.splice((this.entities.length-4), 2);
		console.log('Removed two pipes towards the end of entities array');
	};
};


		// 
		GraphicsSystem.prototype.run = function() {
			window.requestAnimationFrame(this.tick.bind(this));
			// Initial and consequent pipes creation
			this.createNewPipes();
			window.setInterval(this.createNewPipes.bind(this), 2000);
		};

		//
		GraphicsSystem.prototype.tick = function() {
			if (this.canvas.width != this.canvas.offsetWidth ||
				this.canvas.height  != this.canvas.offsetHeight) {
				this.canvas.width  = this.canvas.offsetWidth;
				this.canvas.height = this.canvas.offsetHeight;
			}
			//
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.context.save();
			this.context.translate(this.canvas.width / 2, this.canvas.height);
			this.context.scale(this.canvas.height, -this.canvas.height);
			//
			for (var i = 0; i < this.entities.length; i++) {
				var entity = this.entities[i];
				if (!('graphics' in entity.components)) {
					continue;
				}
				entity.components.graphics.draw(this.context);
			}
			//
			this.context.restore();
			//
			window.requestAnimationFrame(this.tick.bind(this));
		};


exports.GraphicsSystem = GraphicsSystem;
},{"../entities/pipe":14}],20:[function(require,module,exports){
/* Required by game.js --> main.js */

var InputSystem = function(entities) {
	this.entities = entities;
	this.canvas   = document.getElementById('main-canvas');
	this.overlay  = document.getElementById('overlay');
};

		// Bind click and touch handler
		InputSystem.prototype.run = function() {
			this.canvas.addEventListener('click',      this.onClick.bind(this));
			this.canvas.addEventListener('touchstart', this.onClick.bind(this));
			this.overlay.addEventListener('click',      this.onClick.bind(this));
			this.overlay.addEventListener('touchstart', this.onClick.bind(this));
		};

		// Make the bird jump
		InputSystem.prototype.onClick = function() {
			var bird = this.entities[2];
			bird.components.physics.velocity.y = 0.6;
		};


exports.InputSystem = InputSystem;
},{}],21:[function(require,module,exports){
/* Required by game.js --> main.js */

var collisionSystem = require('./collision');

var PhysicsSystem = function(entities) {
	this.entities = entities;
	this.collisionSystem = new collisionSystem.CollisionSystem(entities);
};

		//
		PhysicsSystem.prototype.run = function() {
			window.setInterval(this.tick.bind(this), 1000/60);
		};

		//
		PhysicsSystem.prototype.tick = function() {
			for (var i = 0; i < this.entities.length; i++) {
				var entity = this.entities[i];
				if (!('physics' in entity.components)) {
					continue;
				}
				entity.components.physics.update(1/60);
			}
			//
			this.collisionSystem.tick();
		};


exports.PhysicsSystem = PhysicsSystem;
},{"./collision":18}]},{},[1]);
