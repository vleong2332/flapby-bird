var flapbyBird = require('./game');

// Run Flapby Bird game when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
	var app = new flapbyBird.FlapbyBird();
	app.run();

	// Bind space key to pause and resume the game
	document.addEventListener('keydown', function(event) {
		if (event.keyCode == 32) {
			if (app.state == 1) {
				app.pause();
			}
			else if (app.state == 2) {
				app.resume();
			}
		}
	});

	//
	var continueButton = document.getElementById('continue');
	continueButton.addEventListener('click', function() {
		app.resume();
	});

});