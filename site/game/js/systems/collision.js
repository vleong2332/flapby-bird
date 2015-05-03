//
// Required by physics.js --> game.js --> main.js
//
var graphicsSystem = require ('./graphics'),
		scoreSystem    = require ('./score'),
		eater          = require ('../entities/pipeEater'),
		pipe           = require ('../entities/pipe'),
		bird           = require ('../entities/bird'),
		keeper         = require ('../entities/scoreKeeper');

//
// CollisionSystem handles the what happens if collision between two entity occurs
// CollisionSystem(entities)
//  |_ entities[]
//  |_ graphicsSystem
//  |_ scoreSystem
//  \_ tick()

var CollisionSystem = function(entities) {
	this.entities = entities;
	this.graphicsSystem = new graphicsSystem.GraphicsSystem(entities);
	this.scoreSystem = new scoreSystem.ScoreSystem();
};

		//
		// Function: Check for collisions every tick.
		// This runs right after physics' tick = check for collision after every move
		//
		CollisionSystem.prototype.tick = function() {
			// Goes through each entity in the list
			for (var i=0; i<this.entities.length; i++) {
				var entityA = this.entities[i];
				// Skip to the next if entity doesn't have any components
				if (!('collision' in entityA.components)) {
					continue;
				}
				// Goes through the next entities to compare
				for (var j=i+1; j<this.entities.length; j++) {
					var entityB = this.entities[j];
					// Skip to the next if entity doesn't have any components
					if (!('collision' in entityB.components)) {
						continue;
					}
					// Check for collision between the two entities, skip to the next if none detected
					if (!entityA.components.collision.collidesWith(entityB)) {
						continue;
					}
					// If collision is detected and if entity has a collition handler
					if (entityA.components.collision.onCollision) {
						// Call the entity's own collision handler
						entityA.components.collision.onCollision(entityB);
						
						// If the entity is a bird...
						if (entityA instanceof bird.Bird) {
							// Remove all drawn pipes
							this.graphicsSystem.deleteAllPipes();
							// Reset score
							this.scoreSystem.resetScore();
						}
					
						// If pipeEater collides with pipes, delete that pipes
						if (entityA instanceof eater.Eater && entityB instanceof pipe.Pipe) {
							this.graphicsSystem.deleteLastTwoPipes();
						}
						
						// Update score if scoreKeeper collides with pipe
						if (entityA instanceof keeper.Keeper && entityB instanceof pipe.Pipe) {
							this.scoreSystem.countScore();
						}
					}
					// If collision is detected and the second entity has collision handler...
					if (entityB.components.collision.onCollision) {
						// Call the second entity's own collition handler
						entityB.components.collision.onCollision(entityA);
					}
				}
			}
		};


exports.CollisionSystem = CollisionSystem;