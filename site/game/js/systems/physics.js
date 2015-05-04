//
// PhysicsSystem updates physics components of entities. It runs in sync with CollisionSystem.
// PhysicsSystem
//  |_ entities[]
//  |_ collisionSystem
//  |_ run()
//  |_ pause()
//  |_ resume()
//  \_ tick()

var PhysicsSystem = function() {
	this.entities = null;
	this.collisionSystem = null;
	this.physicsTick = 0;
};

		//
		// Function: Run the Physics System
		//
		PhysicsSystem.prototype.run = function() {
			// Make one tick every 1/60 second which results in 60 fps
			this.physicsTick = new setTimer(this.tick.bind(this), 1000/60);
		};

		//
		// Function: Pause the physics ticks
		//
		PhysicsSystem.prototype.pause = function() {
			this.physicsTick.pause();
		};

		//
		// Function: Resume physics ticks
		//
		PhysicsSystem.prototype.resume = function() {
			this.physicsTick.resume();
		};

		//
		// Function: Execute all PhysicsSystem activities in one tick
		//
		PhysicsSystem.prototype.tick = function() {
			// Go through the list of entity
			for (var i = 0; i < this.entities.length; i++) {
				var entity = this.entities[i];
				// Skip to the next entity if there is no physics component
				if (!('physics' in entity.components)) {
					continue;
				}
				// If there is physics component, call its update()
				entity.components.physics.update(1/60);
			}

			// Also run the CollisionSystem's tick
			// This way, both systems are synced
			this.collisionSystem.tick();
		};


exports.PhysicsSystem = PhysicsSystem;