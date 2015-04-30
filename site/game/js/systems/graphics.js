//
//	Required by game.js --> main.js
//
var pipe = require('../entities/pipe');

// Graphics System is responsible for putting visuals on the canvas
// GraphicsSystem(entities)
//  |_ entities[]
//  |_ canvas
//  |_ context
//  |_ run()
//  |_ tick()
//  |_ createNewPipes()
//  |   |_ minGap
//  |   |_ maxGap
//  |   |_ gap
//  |   |_ buffer
//  |   |_ ttlHeight
//  |   |_ uprHeight
//  |   |_ lwrHeight
//  |   |_ upperPipe
//  |   |_ lowerPipe
//  |_ deleteAllPipes()
//  |_ deleteLastTwoPipes()
//  |_ updateScore(score, hiScore)

var GraphicsSystem = function(entities) {
	this.entities = entities;
	this.canvas   = document.getElementById('main-canvas');
	this.context  = this.canvas.getContext('2d');
};

		//
		// Function: Run the graphics system
		// 
		GraphicsSystem.prototype.run = function() {
			// Execute one tick of GraphicsSystem before the next paint cycle
			// There are normally 60 paint cycles in 1 second
			window.requestAnimationFrame(this.tick.bind(this));
			// Initial and consequent pipes creations
			window.setInterval(this.createNewPipes.bind(this), 2000);
		};

		//
		// Function: Execute all GraphicsSystem activities in one tick
		//
		GraphicsSystem.prototype.tick = function() {
			// Ensure drawing area is the same as canvas area even when resize
			if (this.canvas.width != this.canvas.offsetWidth ||
				this.canvas.height  != this.canvas.offsetHeight) {
				this.canvas.width  = this.canvas.offsetWidth;
				this.canvas.height = this.canvas.offsetHeight;
			}

			// Reset the canvas at every tick
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			// Save a clean state of the canvas
			this.context.save();
			// Put the origin at the bottom middle
			this.context.translate(this.canvas.width/2, this.canvas.height);
			// Flipped the canvas so that y positive points up
			// and maintain the aspect ratio of the coordinates
			this.context.scale(this.canvas.height, -this.canvas.height);
			
			// Go through each entity in the list
			for (var i = 0; i < this.entities.length; i++) {
				var entity = this.entities[i];
				// Skip to the next one if there is no graphics component present
				if (!('graphics' in entity.components)) {
					continue;
				}
				// If there is graphic component, execute it's draw()
				entity.components.graphics.draw(this.context);
			}

			// Restore the canvas to the clean state
			this.context.restore();
			// Execute another tick of GraphicsSystem
			// This will create an infinite execution since the next one calls the next and that
			// calls the next and so on
			window.requestAnimationFrame(this.tick.bind(this));
		};

		//
		// Function: Create one pair of pipes with random gap size
		//
		GraphicsSystem.prototype.createNewPipes = function() {
		var minGap    = 0.15, // SETTING
				maxGap    = 0.45, // SETTING
				gap       = Math.random() * (maxGap - minGap) + minGap,
				buffer    = 0.1,
				ttlHeight = 1 - buffer - gap,
				uprHeight = buffer + (Math.random() * (ttlHeight - buffer) + buffer),
				lwrHeight = buffer + (ttlHeight - uprHeight),
				upperPipe = new pipe.Pipe('upper', uprHeight),
				lowerPipe = new pipe.Pipe('lower', lwrHeight);
		// Insert the two pipes into the list of entities starting at the 4th position
		// The first three entities in the lists are eater, keeper, and bird.
		this.entities.splice(3, 0, upperPipe, lowerPipe);
	};

	//
	// Function: Remove all pipes from the canvas
	//
	GraphicsSystem.prototype.deleteAllPipes = function() {
		// Remove all entities minus 5 starting from the fourth position
		// The first 3 entities are eater, keeper, and bird
		// The last 2 entities are ground and ceiling
		this.entities.splice(3, (this.entities.length-5));
	};

	//
	// Function: Remove a pair of pipes
	//
	GraphicsSystem.prototype.deleteLastTwoPipes = function() {
		// Remove the last two pipes in the list of entities
		this.entities.splice((this.entities.length-4), 2);
	};

	//
	// Function: Update scores passed from collision system
	//
	GraphicsSystem.prototype.updateScore = function(score, hiScore) {
		// Set high score
		if (score > hiScore) hiScore = score;
		console.log(score > hiScore);
		// Display scores to the HTML
		document.getElementById('score').innerHTML    = score;
		document.getElementById('hi-score').innerHTML = hiScore;
		return hiScore;
	};


exports.GraphicsSystem = GraphicsSystem;