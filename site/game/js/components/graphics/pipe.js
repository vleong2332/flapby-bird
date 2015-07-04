//
// PipeGraphicsComponent
//  |_ entity
//  \_ draw()
//

var PipeGraphicsComponent = function(entity, background) {
	this.entity = entity;
	this.background = background;
};

		PipeGraphicsComponent.prototype.draw = function(context) {
			var position = this.entity.components.physics.position,
				 width    = this.entity.size.x,
				 height   = this.entity.size.y;
			var pattern = context.createPattern(this.background, 'repeat');
			var scale = 1000;
			var W = width * scale;
			var H = height * scale;
			//
			context.save();
			context.fillStyle   = pattern;
			context.fillRect(position.x, position.y, W/1000, (position.y == 1 ? -H/1000 : H/1000));
			context.strokeStyle = '#333';
			context.lineWidth   = 0.01;
		   context.strokeRect(position.x, position.y, width, (position.y == 1 ? -height : height));
		   context.restore();
		};

exports.PipeGraphicsComponent = PipeGraphicsComponent;