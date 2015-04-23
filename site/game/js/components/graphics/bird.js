// Component declaration
// Will initialized when created in entity
var BirdGraphicsComponent = function(entity) {
	// Tag which entity this component belongs to
	this.entity = entity;
};

// Declare draw()
// Will be called by systems
// Access syntax (BirdGraphicsComponent).draw()
BirdGraphicsComponent.prototype.draw = function() {
	console.log("Drawing a bird");
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;