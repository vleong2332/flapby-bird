var flapbyBird = require('./game');

document.addEventListener('DOMContentLoaded', function() {
	var app = new flapbyBird.FlapbyBird();
	app.run();
});