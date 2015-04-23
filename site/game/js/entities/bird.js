// Include components needed
var graphicsComponent = require('../components/graphics/bird');

// Create Bird entity
var Bird = function() {
	console.log("Creating Bird entity");

	// Initialize components
	var graphics = new graphicsComponent.BirdGraphicsComponent(this);
	// Storing components in one object.
	// Acess syntax will be (entity).components.(component)
	this.components = {
		graphics: graphics
	};
};

exports.Bird = Bird;