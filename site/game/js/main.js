var flapbyBird = require('./game');

// Run Flapby Bird game when DOM is ready
document.addEventListener('DOMContentLoaded', function() {

	// Load and initialize the game
	var app = new flapbyBird.FlapbyBird();
	app.init();

	// Bind touch and click to initial play instruction to start the game
	var playInstruction = document.getElementById('play-instruction');
	playInstruction.addEventListener('click',      function() {app.run();});
	playInstruction.addEventListener('touchstart', function() {app.run();});

	// Bind space key to pause and resume the game
	document.addEventListener('keydown', function(event) {
		if (event.keyCode == 32) {
			if (app.state == 1) {app.pause();}
			else
			if (app.state == 2) {app.resume();}
		}
	});

	// Bind touch and click to continue button to resume the game
	var continueButton = document.getElementById('continue');
	continueButton.addEventListener('click',      function() {app.resume();});
	continueButton.addEventListener('touchstart', function() {app.resume();});

});