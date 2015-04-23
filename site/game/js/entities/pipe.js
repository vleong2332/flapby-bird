// Include components needed
var graphicsComponent = require('../components/graphics/pipe');

// Create Pipe entity
var Pipe = function() {
	console.log("Creating Pipe entity");

	// Initialize components
	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	// Storing components in one object.
	// Acess syntax will be (entity).components.(component)
	this.components = {
		graphics: graphics
	};
};

exports.Pipe = Pipe;