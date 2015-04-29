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