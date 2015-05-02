//
// CeilingGraphicsComponent
//  |_ entity
//  \_ draw()
//

var CeilingGraphicsComponent = function(entity) {
	this.entity = entity;
};

	//
	// Function: Draw rectangle on canvas
	//
	CeilingGraphicsComponent.prototype.draw = function(context) {
		var position = this.entity.components.physics.position,
				width    = this.entity.size.x,
				height   = this.entity.size.y;
		//
		context.save();
		context.fillStyle = '#650000';
	  context.fillRect(position.x, position.y, width, -height);
	  context.restore();
	};


exports.CeilingGraphicsComponent = CeilingGraphicsComponent;