//
// GroundGraphicsComponent
//  |_ entity
//  \_ draw()
//

var GroundGraphicsComponent = function(entity) {
	this.entity = entity;
};

	//
	// Function: Draw rectangle on canvas
	//
	GroundGraphicsComponent.prototype.draw = function(context) {
		var position = this.entity.components.physics.position,
				width    = this.entity.size.x,
				height   = this.entity.size.y;
		//
		context.save();
		context.fillStyle = '#000';
	  context.fillRect(position.x, position.y, width, height);
	  context.restore();
	};


exports.GroundGraphicsComponent = GroundGraphicsComponent;