var EaterGraphicsComponent = function(entity) {
	this.entity = entity;
};

		EaterGraphicsComponent.prototype.draw = function(context) {
			var position = this.entity.components.physics.position,
					width    = this.entity.size.x,
					height   = this.entity.size.y;
			//
			context.save();
			context.fillStyle = '#000';
		  context.fillRect(position.x, position.y, width, height);
		  context.restore();
		};

exports.EaterGraphicsComponent = EaterGraphicsComponent;