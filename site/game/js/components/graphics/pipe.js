//
// PipeGraphicsComponent
//  |_ entity
//  \_ draw()
//

var PipeGraphicsComponent = function(entity, background) {
	this.entity = entity;
	this.background = background;
	this.red = true;
};

		PipeGraphicsComponent.prototype.draw = function(context) {
			var position = this.entity.components.physics.position,
				 width    = this.entity.size.x,
				 height   = this.entity.size.y;
			
			//
			context.save();

			// console.log(this.background);
			// context.beginPath();
			var pattern = context.createPattern(this.background, 'repeat');
			// context.fill();
			context.fillStyle = pattern;
			context.fillRect(position.x, position.y, width, (position.y == 1 ? -height : height));

			// context.strokeStyle = '#333';
			// context.lineWidth   = 0.01;
		   // context.strokeRect(position.x, position.y, width, (position.y == 1 ? -height : height));
		   // context.stroke();
		   context.restore();
		};

exports.PipeGraphicsComponent = PipeGraphicsComponent;