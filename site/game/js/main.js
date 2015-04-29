var flapbyBird = require('./game');

// Run Flapby Bird game when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
	var app = new flapbyBird.FlapbyBird();
	app.run();
});