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
		this.entities.push(new pipe.Pipe('upper', uprHeight));
		this.entities.push(new pipe.Pipe('lower', lwrHeight));
	};
	this.deleteAllPipes = function() {
		// Reset game by deleting all pipes entites and create a new one
		this.entities.splice(3, this.entities.length);
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