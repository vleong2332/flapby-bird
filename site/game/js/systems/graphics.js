// System declaration - will be called in game.
var GraphicsSystem = function(entities) {
	// Tag which entity the system belongs to
	this.entities = entities;
};

// Declare run() - will be called in game when game is called
GraphicsSystem.prototype.run = function() {
	// Tick the graphics systems a few times to see it in action
	for (var i = 0; i < 5; i++) {
		this.tick();
	}
};

// tick() declaration
GraphicsSystem.prototype.tick = function() {
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
};

exports.GraphicsSystem = GraphicsSystem;