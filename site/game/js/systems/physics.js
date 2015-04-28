// System declaration - will be called in game.
var PhysicsSystem = function(entities) {
	// Tag which entity the system belongs to
	this.entities = entities;
};

// Declare run() - will be called in game when game is called
PhysicsSystem.prototype.run = function() {
	// Run the render loop
	window.setInterval(this.tick.bind(this), 1000/60);
};

// tick() declaration
PhysicsSystem.prototype.tick = function() {
	// Rendering goes here
	// Go through all the entities
	for (var i = 0; i < this.entities.length; i++) {
		var entity = this.entities[i];
		// Check to see if an entity has graphics component
		if (!('physics' in entity.components)) {
			// Skip to the next entity if it doesn't have graphics component
			continue;
		}
		// Call draw() if it has graphics component
		entity.components.physics.update(1/60);
	}
};


exports.PhysicsSystem = PhysicsSystem;