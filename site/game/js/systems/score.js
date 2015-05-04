//
// ScoreSystem interacts with the game and Local Storage API
// ScoreSystem
//  |_ points
//  |_ score
//  |_ hiScore
//  |_ countScore()
//  |_ resetScore()
//  |_ updateScore()
//  |_ loadHiScore()
//  \_ saveHiScore()
//

var ScoreSystem = function() {
	this.points  = 0;
	this.score   = 0;
	this.hiScore = this.loadHiScore();
};

	//
	// Function: Turn points into score
	//
	ScoreSystem.prototype.countScore = function() {
		this.points++;
		if (this.points % 66 === 0) {
			this.score++;
		}
		// Set high score
		if (this.score > this.hiScore) {
			this.hiScore = this.score;
			this.saveHiScore();
		}
		this.updateScore();
	};

	//
	// Function: Reset score to 0
	//
	ScoreSystem.prototype.resetScore = function() {
		this.points = 0;
		this.score  = 0;
		this.updateScore();
	};

	//
	// Function: Reflect the score on the game
	//
	ScoreSystem.prototype.updateScore = function() {
		document.getElementById('score').innerHTML    = this.score;
		document.getElementById('hi-score').innerHTML = this.hiScore;
	};

	//
	// Function: Try to get previously stored hiScore
	//
	ScoreSystem.prototype.loadHiScore = function() {
		if (Modernizr.localstorage) {
			return parseInt(window.localStorage.getItem('hiScore')) || parseInt('0');
		}
		else {
			console.log("Local Storage is not available with in this browser. High Score cannot be loaded.");
			return 0;
		}
	};

	//
	// Function: Store hiScore in Local Storage
	//
	ScoreSystem.prototype.saveHiScore = function() {
		if (Modernizr.localstorage) {
			window.localStorage.setItem('hiScore', this.hiScore);
		}
		else {
			console.log("Local Storage is not available with in this browser. High Score cannot be saved.");
		}
	};


exports.ScoreSystem = ScoreSystem;