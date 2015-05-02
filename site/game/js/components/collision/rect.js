//
// RectCollisionComponent
//  |_ entity
//  |_ size
//  |_ type
//  |_ collidesWith
//  |_ collideCircle
//  \_ collideRect
//

var RectCollisionComponent = function(entity, size) {
	this.entity = entity;
	this.size   = size;
	this.type   = 'rect';
};

	//
	// Function: Check for collision
	//
	RectCollisionComponent.prototype.collidesWith = function(entity) {
		if (entity.components.collision.type == 'circle') {
			return this.collideCircle(entity);
		}
		else if (entity.components.collision.type == 'rect') {
			return this.collideRect(entity);
		}
		return false;
	};

	//
	// Function: Handles rectangle-circle collision
	//
	RectCollisionComponent.prototype.collideCircle = function(entity) {
		// Let the circle handles the collision
		return entity.components.collision.collideRect(this.entity);
	};

	//
	// Function: Handles rectangle-rectangle collision
	//
	RectCollisionComponent.prototype.collideRect = function (entity) {
		var positionA = this.entity.components.physics.position,
				positionB = entity.components.physics.position,
				sizeA = this.size,
				sizeB = entity.components.collision.size;
		//		
		var centerA = {
					x: positionA.x + sizeB.x / 2,
					y: (positionA.y == 1) ? (positionA.y - sizeA.y / 2) : (positionA.y + sizeA.y / 2)
				},
				centerB = {
					x: positionB.x + sizeB.x / 2,
					y: (positionB.y == 1) ? (positionB.y - sizeB.y / 2) : (positionB.y + sizeB.y / 2)
				};
		//
		var leftA   = centerA.x - (sizeA.x/2),
				rightA  = centerA.x + (sizeA.x/2),
				topA    = centerA.y + (sizeA.y/2),
				bottomA = centerA.y - (sizeA.y/2),
				leftB   = centerB.x - (sizeB.x/2),
				rightB  = centerB.x + (sizeB.x/2),
				topB    = centerB.y + (sizeB.y/2),
				bottomB = centerB.y - (sizeB.y/2);
		//
		return !(leftA   > rightB || leftB   > rightA ||
						 bottomA > topB   || bottomB > topA);
	};


exports.RectCollisionComponent = RectCollisionComponent;