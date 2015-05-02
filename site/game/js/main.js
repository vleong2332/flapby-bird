var flapbyBird = require('./game');

// Run Flapby Bird game when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
	var app = new flapbyBird.FlapbyBird();
	app.run();

	document.addEventListener('keydown', function(event) {
		if (event.keyCode == 32) {
			if (app.state == 1 || app.state == 3)
				app.pause();
			else if (app.state == 2)
				app.resume();
		}
	});
});