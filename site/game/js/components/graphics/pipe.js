var PipeGraphicsComponent = function(entity) {
	this.entity = entity;
};

		PipeGraphicsComponent.prototype.draw = function(context) {
			var position = this.entity.components.physics.position;

			context.save();
			context.fillStyle = '#006500';
		  context.fillRect(position.x, position.y, 0.1, 0.3);
		  context.restore();
		};

exports.PipeGraphicsComponent = PipeGraphicsComponent;