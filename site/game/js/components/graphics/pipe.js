// Component declaration
// Will initialized when created in entity
var PipeGraphicsComponent = function(entity) {
	// Tag which entity this component belongs to
	this.entity = entity;
};

// Declare draw()
// Will be called by systems
// Access syntax (BirdGraphicsComponent).draw()
PipeGraphicsComponent.prototype.draw = function() {
	console.log("Drawing a pipe");
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;