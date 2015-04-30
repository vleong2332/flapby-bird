var CircleCollisionComponent = function(entity, radius) {
	this.entity = entity;
	this.radius = radius;
	this.type   = 'circle';
};


		CircleCollisionComponent.prototype.collidesWith = function(entity) {
			if (entity.components.collision.type == 'circle') {
				return this.collideCircle(entity);
			}
			else if (entity.components.collision.type == 'rect') {
				return this.collideRect(entity);
			}
			return false;
		};

		//
		CircleCollisionComponent.prototype.collideCircle = function (entity) {
			var positionA = this.entity.components.physics.position, // This circle object
					positionB = entity.components.physics.position, // The other circle object
					diff      = {
												x: positionA.x - positionB.x,
												y: positionA.y - positionB.y
											};
			//
			var radiusA   = this.radius,
					radisuB   = entity.components.collision.radius,
					radiusSum = radiusA + radiusB;
					
			//
			var distanceSquared = diff.x*diff.x + diff.y*diff.y;
			//
			return (distanceSquared < radiusSum*radiusSum);
		};

		//
		CircleCollisionComponent.prototype.collideRect = function (entity) {
			var clamp = function(val, lo, hi) {
				if (val < lo) {
					return lo;
				}
				if (val > hi) {
					return hi;
				}
				return val;
			};
			//
			var positionA = this.entity.components.physics.position,
					positionB = entity.components.physics.position,
					sizeB     = entity.components.collision.size,
					radiusA   = this.radius;
			var center = {
											x: positionB.x + sizeB.x / 2,
											y: (positionB.y == 1) ? (positionB.y - sizeB.y / 2) : (positionB.y + sizeB.y / 2)
									 };
			//
			var closest = {
											x: clamp(positionA.x,
															 center.x - (sizeB.x/2),
															 center.x + (sizeB.x/2)),
											y: clamp(positionA.y,
															 center.y - (sizeB.y/2),
															 center.y + (sizeB.y/2))
										};
			var diff = {
									 x: positionA.x - closest.x,
									 y: positionA.y - closest.y
								 };
			//
			var distanceSquared = diff.x*diff.x + diff.y*diff.y;
			//
			return distanceSquared < radiusA*radiusA;
		};


	exports.CircleCollisionComponent = CircleCollisionComponent;