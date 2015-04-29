var RectCollisionComponent = function(entity, size) {
	this.entity = entity;
	this.size   = size;
	this.type   = 'rect';
};

		RectCollisionComponent.prototype.collidesWith = function(entity) {
			if (entity.components.collision.type == 'circle') {
				return this.collideCircle(entity);
			}
			else if (entity.components.collision.type == 'rect') {
				return this.collideRect(entity);
			}
			return false;
		};

		RectCollisionComponent.prototype.collideCircle = function(entity) {
			return entity.components.collision.collideRect(this.entity);
		};

		RectCollisionComponent.prototype.collideRect = function (entity) {
			var positionA = this.entity.components.physics.position,
					positionB = entity.components.physics.position,
					sizeA = this.size,
					sizeB = entity.components.collision.size;
			//
			var leftA   = positionA.x - (sizeA.x/2),
					rightA  = positionA.x + (sizeA.x/2),
					topA    = positionA.y + (sizeA.y/2),
					bottomA = positionA.y - (sizeA.y/2);
			//
			var leftB   = positionB.x - (sizeB.x/2),
					rightB  = positionB.x + (sizeB.x/2),
					topB    = positionB.y + (sizeB.y/2),
					bottomB = positionB.y - (sizeB.y/2);
			//
			return !(leftA   > rightB || leftB   > rightA ||
							 bottomA > topB   || bottomB > topA);
		};


exports.RectCollisionComponent = RectCollisionComponent;