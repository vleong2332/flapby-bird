var graphicsSystem = require ('./graphics');
var eater          = require ('../entities/pipeEater');
var pipe          = require ('../entities/pipe');
var bird          = require ('../entities/bird');

var CollisionSystem = function(entities) {
	this.entities = entities;
	this.graphicsSystem = new graphicsSystem.GraphicsSystem(entities);
};

		CollisionSystem.prototype.tick = function() {
			for (var i=0; i<this.entities.length; i++) {
				var entityA = this.entities[i];
				if (!('collision' in entityA.components)) {
					continue;
				}
				//
				for (var j=i+1; j<this.entities.length; j++) {
					var entityB = this.entities[j];
					if (!('collision' in entityB.components)) {
						continue;
					}
					//
					if (!entityA.components.collision.collidesWith(entityB)) {
						continue;
					}
					//
					if (entityA.components.collision.onCollision) {
						entityA.components.collision.onCollision(entityB);
						//
						if (entityA instanceof bird.Bird) {
							this.graphicsSystem.deleteAllPipes();
						}
						if (entityA instanceof eater.Eater && entityB instanceof pipe.Pipe) {
							console.log (entityA, 'collides with', entityB);
							this.graphicsSystem.deleteLastTwoPipes();
						}
					}
					//
					if (entityB.components.collision.onCollision) {
						entityB.components.collision.onCollision(entityA);
					}
				}
			}
		};

exports.CollisionSystem = CollisionSystem;