var graphicsSystem = require ('./graphics');

var CollisionSystem = function(entities) {
	this.entities = entities;
	this.graphicsSystem = new graphicsSystem.GraphicsSystem(entities);
};

		CollisionSystem.prototype.tick = function() {
			for (var i=0; i<this.entities.length; i++) {
				var entityA = this.entities[i];
				if (!'collision' in entityA.components) {
					continue;
				}
				//
				for (var j=i+1; j<this.entities.length; j++) {
					var entityB = this.entities[j];
					if (!'collision' in entityB.components) {
						continue;
					}
					//
					if (!entityA.components.collision.collidesWith(entityB)) {
						continue;
					}
					//
					if (entityA.components.collision.onCollision) {
						entityA.components.collision.onCollision(entityB);
						this.graphicsSystem.deleteAllPipes();
					}
					//
					if (entityB.components.collision.onCollision) {
						entity.B.components.collision.onCollision(entityA);
					}
				}
			}
		};

exports.CollisionSystem = CollisionSystem;