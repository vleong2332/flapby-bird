/* Required by game.js --> main.js */

var InputSystem = function(entities) {
	this.entities = entities;
	this.canvas   = document.getElementById('main-canvas');
	this.overlay  = document.getElementById('overlay');
};

		// Bind click and touch handler
		InputSystem.prototype.run = function() {
			this.canvas.addEventListener('click',      this.onClick.bind(this));
			this.canvas.addEventListener('touchstart', this.onClick.bind(this));
			this.overlay.addEventListener('click',      this.onClick.bind(this));
			this.overlay.addEventListener('touchstart', this.onClick.bind(this));
		};

		// Make the bird jump
		InputSystem.prototype.onClick = function() {
			var bird = this.entities[2];
			bird.components.physics.velocity.y = 0.6;
		};


exports.InputSystem = InputSystem;