var KeeperGraphicsComponent = function(entity) {
	this.entity = entity;
};

		KeeperGraphicsComponent.prototype.draw = function(context) {
			var position = this.entity.components.physics.position,
					width    = this.entity.size.x,
					height   = this.entity.size.y;
			//
			context.save();
			context.fillStyle = 'rgba(0,0,0,0)';
		  context.fillRect(position.x, position.y, width, height);
		  context.restore();
		};

exports.KeeperGraphicsComponent = KeeperGraphicsComponent;