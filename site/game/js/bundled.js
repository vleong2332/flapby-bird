(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var flapbyBird = require('./game');

document.addEventListener('DOMContentLoaded', function() {
	var app = new flapbyBird.FlapbyBird();
	app.run();
});
},{"./game":7}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
	this.entity = entity;
};

		PipeGraphicsComponent.prototype.draw = function(context) {
			var position = this.entity.components.physics.position,
					width    = this.entity.width,
					height   = this.entity.height;
					//gap      = this.entity.gap,
					//buffer   = this.entity.buffer,
			context.save();
			context.fillStyle = '#006500';
		  context.fillRect(position.x, position.y, width, (position.y == 1 ? -height : height));
		  context.restore();
		};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],4:[function(require,module,exports){
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
			console.log('updating');
			this.velocity.x += this.acceleration.x * delta;
			this.velocity.y += this.acceleration.y * delta;

			this.position.x += this.velocity.x * delta;
			this.position.y += this.velocity.y * delta;
		};

exports.PhysicsComponent = PhysicsComponent;
},{}],5:[function(require,module,exports){
var graphicsComponent = require('../components/graphics/bird');
var physicsComponent = require('../components/physics/physics');

var Bird = function() {
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 0.5;
	physics.acceleration.y = -1.5;

	var graphics = new graphicsComponent.BirdGraphicsComponent(this);
	
	this.components = {
		graphics: graphics,
		physics: physics
	};
};

exports.Bird = Bird;
},{"../components/graphics/bird":2,"../components/physics/physics":4}],6:[function(require,module,exports){
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
	physics.position.x = 1 - this.width;
	physics.position.y = (loc === "upper") ? 1 : 0;
	physics.acceleration.x -= 0.1;
	//
	this.components = {
		graphics: graphics,
		physics:  physics
	};
};

exports.Pipe = Pipe;
},{"../components/graphics/pipe":3,"../components/physics/physics":4}],7:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlapbyBird = function() {
	this.entities = [new bird.Bird()];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.input = new inputSystem.InputSystem(this.entities);
};

		FlapbyBird.prototype.run = function() {
			this.graphics.run();
			this.physics.run();
			this.input.run();
		};

exports.FlapbyBird = FlapbyBird;
},{"./entities/bird":5,"./entities/pipe":6,"./systems/graphics":8,"./systems/input":9,"./systems/physics":10}],8:[function(require,module,exports){
var pipe = require('../entities/pipe');

var GraphicsSystem = function(entities) {
	// Tag which entity the system belongs to
	this.entities = entities;
	this.canvas = document.getElementById('main-canvas');
	this.context = this.canvas.getContext('2d');
	this.createNewPipes = function() {
		console.log('creating pipes');
		var gap = Math.random() * (0.5 - 0.2) + 0.2;
		var buffer = 0.1;
		var ttlHeight = 1 - buffer - gap;
		var uprHeight = buffer + (Math.random() * (ttlHeight - buffer) + buffer);
		var lwrHeight = buffer + (ttlHeight - uprHeight);
		this.entities.push(new pipe.Pipe('upper', uprHeight));
		this.entities.push(new pipe.Pipe('lower', lwrHeight));
		console.log(gap, uprHeight, lwrHeight);
	};
};


		GraphicsSystem.prototype.run = function() {
			window.requestAnimationFrame(this.tick.bind(this));
			this.createNewPipes();
			window.setInterval(this.createNewPipes.bind(this), 2000);
		};


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
},{"../entities/pipe":6}],9:[function(require,module,exports){
var InputSystem = function(entities) {
	this.entities = entities;

	// Canvas is where we get input from
	this.canvas = document.getElementById('main-canvas');
};

		InputSystem.prototype.run = function() {
			this.canvas.addEventListener('click', this.onClick.bind(this));
			this.canvas.addEventListener('touchstart', this.onClick.bind(this));
		};

		InputSystem.prototype.onClick = function() {
			var bird = this.entities[0];
			bird.components.physics.velocity.y = 0.6;
		};

exports.InputSystem = InputSystem;
},{}],10:[function(require,module,exports){
var PhysicsSystem = function(entities) {
	this.entities = entities;
};


PhysicsSystem.prototype.run = function() {
	window.setInterval(this.tick.bind(this), 1000/60);
};


		PhysicsSystem.prototype.tick = function() {
			for (var i = 0; i < this.entities.length; i++) {
				var entity = this.entities[i];
				if (!('physics' in entity.components)) {
					continue;
				}
				entity.components.physics.update(1/60);
			}
		};


exports.PhysicsSystem = PhysicsSystem;
},{}]},{},[1]);
