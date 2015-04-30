var graphicsSystem = require ('./graphics');
var eater          = require ('../entities/pipeEater');
var pipe          = require ('../entities/pipe');
var bird          = require ('../entities/bird');
var keeper        = require ('../entities/scoreKeeper');

var CollisionSystem = function(entities) {
	this.entities = entities;
	this.graphicsSystem = new graphicsSystem.GraphicsSystem(entities);
	this.points  = 0;
	this.score   = 0;
	this.hiScore = 0;
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

					// Skip to next iteration if no collition is detected
					if (!entityA.components.collision.collidesWith(entityB)) {
						continue;
					}

					// If collision is detected and if entity has a collition handlre
					if (entityA.components.collision.onCollision) {
						// Call the entity's own collision handler
						entityA.components.collision.onCollision(entityB);

						// If bird hits anything...
						if (entityA instanceof bird.Bird) {
							// Remove all drawn pipes
							this.graphicsSystem.deleteAllPipes();
							// Set high score
							if (this.score > this.hiScore) this.hiScore = this.score;
							// Reset score
							this.score = 0;
							this.points = 0;
							document.getElementById('score').innerHTML = this.score;
							document.getElementById('hi-score').innerHTML = this.hiScore;
						}

						// Remove pipes that went out of screen if pipeEater collides with pipe
						if (entityA instanceof eater.Eater && entityB instanceof pipe.Pipe) {
							console.log (entityA, 'collides with', entityB);
							this.graphicsSystem.deleteLastTwoPipes();
						}

						// Update score if scoreKeeper collides with pipe
						if (entityA instanceof keeper.Keeper && entityB instanceof pipe.Pipe) {
							this.points++;
							if (!(this.points % 50)) {
								this.score++;
								document.getElementById('score').innerHTML = this.score;
							}
						}
					}
					// If collision is detected and the second entity has 
					if (entityB.components.collision.onCollision) {
						// Call the second entity's own collition handler if there is any
						entityB.components.collision.onCollision(entityA);
					}
				}
			}
		};

exports.CollisionSystem = CollisionSystem;