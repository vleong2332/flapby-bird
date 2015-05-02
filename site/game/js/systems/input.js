//
// Required by game.js --> main.js
//

//
// InputSystem handles all events triggered by the user
// InputSystem(entities)
//  |_ entities[]
//  |_ canvas
//  |_ overlay
//  |_ run()
//  \_ flap()

var InputSystem = function(entities) {
	this.entities = entities;
	this.canvas   = document.getElementById('main-canvas');
	this.overlay  = document.getElementById('overlay');
};

		//
		// Function: Run Input System
		//
		InputSystem.prototype.run = function() {
			// Bind click and touch event handlers to the canvas
			this.canvas.addEventListener('click',       this.flap.bind(this));
			this.canvas.addEventListener('touchstart',  this.flap.bind(this));
			this.overlay.addEventListener('click',      this.flap.bind(this));
			this.overlay.addEventListener('touchstart', this.flap.bind(this));
		};

		//
		// Function: Executes when user click on canvas
		//
		InputSystem.prototype.flap = function() {
			// Bird is the third entity
			var bird = this.entities[2];
			// Make the bird jumps by changing it's velocity upwards
			bird.components.physics.velocity.y = 0.6; // SETTING
		};


exports.InputSystem = InputSystem;