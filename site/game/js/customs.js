function setTimer(callback, interval) {
	var timerId   = 0,
			timeoutId = 0,
			startTime = 0,
			remTime   = 0,
			state     = 0; // 0-idle, 1-running, 2-paused, 3-resumed

	//
	//
	//
	this.pause = function() {
		if (state != 1) return; // Exit if it's not running
		// Tries to reset any timeout or interval previously set
		window.clearTimeout(timeoutId);
		window.clearInterval(timerId);
		// Find the remaining time left in the interval
		remTime = interval - ((new Date() - startTime) % interval);
		state = 2;
	};

	//
	//
	//
	this.resume = function() {
		if (state != 2) return; // Exit if it's not paused
		//window.clearTimeout(timeoutId);
		//window.clearInterval(timerId);
		timeoutId = window.setTimeout(this.delayedCallback, remTime);
		state = 3;
	};

	//
	//
	//
	this.delayedCallback = function() {
		if (state != 3) return;
		callback();
		//
		startTime = new Date();
		timerId = window.setInterval(callback, interval);
		state = 1;
	};

	startTime = new Date();
	timerId = window.setInterval(callback, interval);
	state = 1;
}


/* USAGE:

var timer = new setTimer(function() {
	alert("Done!");
	}, 5000);

window.setTimeout(function() {
	timer.pause();
	window.setTimeout(function() {
		timer.resume();
	}, 5000);
}, 2000);

*/