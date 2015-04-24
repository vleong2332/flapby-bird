// System declaration - will be called in game.
var GraphicsSystem = function(entities) {
	// Tag which entity the system belongs to
	this.entities = entities;
	this.canvas = document.getElementById('main-canvas');
	this.context = this.canvas.getContext('2d');
};



// Declare run() - will be called in game when game is called
GraphicsSystem.prototype.run = function() {
	// Run the render loop
	window.requestAnimationFrame(this.tick.bind(this));
};



// tick() declaration
GraphicsSystem.prototype.tick = function() {
	// Set the canvas to the window size when resized
	if (this.canvas.width != this.canvas.offsetWidth ||
		this.canvas.height  != this.canvas.offsetHeight) {
		this.canvas.width  = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;
	}

	// Clear the canvas
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	// Rendering goes here
	// Go through all the entities
	for (var i = 0; i < this.entities.length; i++) {
		var entity = this.entities[i];
		// Check to see if an entity has graphics component
		if (!('graphics' in entity.components)) {
			// Skip to the next entity if it doesn't have graphics component
			continue;
		}
		// Call draw() if it has graphics component
		entity.components.graphics.draw(this.context);
	}

	// Continue the render loop - calls this function again
	window.requestAnimationFrame(this.tick.bind(this));
};



exports.GraphicsSystem = GraphicsSystem;