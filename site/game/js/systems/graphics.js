var assetManager    = require('./assetManager');
var pipe            = require('../entities/pipe');

// Graphics System is responsible for putting visuals on the canvas
// GraphicsSystem(entities)
//  |_ entities[]
//  |_ canvas
//  |_ context
//  |_ animFrame
//  |_ pipeCreation
//  |_ run()
//  |_ pause()
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
//  |   \_ lowerPipe
//  |_ resetGraphics()
//  |_ deleteAllPipes()
//  |_ deleteLastTwoPipes()
//  |_ updateScore(score, hiScore)
//  \_ drawGrid(gap, times)
//

var GraphicsSystem = function() {
	this.entity       = null;
	this.canvas       = document.getElementById('main-canvas');
	this.context      = this.canvas.getContext('2d');
	this.animFrame    = 0; // Will contained ID returned by requestAnimationFrame()
	this.pipeCreation = 50; // Indicates how many ticks between creating new pipes
	this.bgPosX       = 1.2;
	this.assetManager = new assetManager.AssetManager();
	this.assets       = {};
};

	//
	// Function: Initialize the first tick
	//
	GraphicsSystem.prototype.init = function() {
		this.assetManager.queueAsset('img/bird_sprite.png');
		this.assetManager.queueAsset('img/desert-bg.png');
		this.assetManager.queueAsset('img/sky-bg.png');
		this.assetManager.queueAsset('img/acg01041.png');
		var that = this;
		this.assetManager.downloadAssets(function() {
			that.assets = {
				skyBg:    that.assetManager.getAsset('img/sky-bg.png'),
				desertBg: that.assetManager.getAsset('img/desert-bg.png'),
				pipeBg:   that.assetManager.getAsset('img/acg01041.png')
			};
			that.tick.bind(that);
			that.tick(1); // Indicate initialization. Only run tick one time.
		});
	};

	//
	// Function: Run the graphics system
	// 
	GraphicsSystem.prototype.run = function() {
		// Execute one tick of GraphicsSystem before the next paint cycle
		// There are normally 60 paint cycles in 1 second
		this.animFrame = window.requestAnimationFrame(this.tick.bind(this));
		document.getElementById('pause-overlay').className = "hidden";
		document.getElementById('play-instruction').className = "hidden";
	};

	//
	// Function: Pause the graphics system
	//
	GraphicsSystem.prototype.pause = function() {
		window.cancelAnimationFrame(this.animFrame);
		document.getElementById('pause-overlay').className = "";
	};

	//
	// Function: Reset the game graphics
	//
	GraphicsSystem.prototype.reset = function() {
		window.cancelAnimationFrame(this.animFrame);
	 	var counter   = 3,
			 counterId = 0,
			 overlay = document.getElementById('reset-overlay');
		
		var thisSub = this;
		counterId = window.setInterval(function() {
			if (counter !== 0) {
				overlay.className = "";
	 			document.getElementById('reset-counter').innerHTML = counter--;
		 	}
		 	else {
		 		overlay.className = "hidden";
		 		thisSub.deleteAllPipes.bind(thisSub);
		 		thisSub.deleteAllPipes();
		 		thisSub.tick.bind(thisSub);
		 		thisSub.tick(1);
				this.animFrame = window.requestAnimationFrame(thisSub.tick.bind(thisSub));
		 		window.clearInterval(counterId);
		 	}
		}, 1000);
	};

	//
	// Function: Execute all GraphicsSystem activities in one tick
	//
	GraphicsSystem.prototype.tick = function(init) {
		// Ensure drawing area is the same as canvas area even when resize
		if (this.canvas.width   != this.canvas.offsetWidth ||
			 this.canvas.height  != this.canvas.offsetHeight) {
		    this.canvas.width    = this.canvas.offsetWidth;
			 this.canvas.height   = this.canvas.offsetHeight;
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
		
		// Dawing grid below the entities
		// Uncomment to see
		//this.drawGrid();
		// console.log(init);
		if (init === 1) {
			this.drawBackground([this.assets.desertBg, this.assets.skyBg], this.bgPosX);
		}
		else {
			this.bgPosX -= 0.002;
			this.drawBackground([this.assets.desertBg, this.assets.skyBg], this.bgPosX);
		}

		// Create new pipes every so often
		if (--this.pipeCreation === 0) {
			this.createNewPipes();
			this.pipeCreation = 150;
		}

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

		// Dawing grid on top of the entities
		// Uncomment to see
		//this.drawGrid();

		// Restore the canvas to the clean state
		this.context.restore();
		// Execute another tick of GraphicsSystem
		// This will create an infinite execution since the next one calls the next and that
		// calls the next and so on
		// If it's initial tick, don't recall this function
		if (init != 1) {
			this.animFrame = window.requestAnimationFrame(this.tick.bind(this));
		}
	};

	//
	// Function: Create one pair of pipes with random gap size
	//
	GraphicsSystem.prototype.createNewPipes = function() {
		var minGap    = 0.18, // SETTING
			 maxGap    = 0.38, // SETTING
			 gap       = Math.random() * (maxGap - minGap) + minGap,
			 buffer    = 0.1,
			 ttlHeight = 1 - buffer - gap,
			 uprHeight = buffer + (Math.random() * (ttlHeight - buffer) + buffer),
			 lwrHeight = buffer + (ttlHeight - uprHeight),
			 upperPipe = new pipe.Pipe('upper', uprHeight, this.assets.pipeBg),
			 lowerPipe = new pipe.Pipe('lower', lwrHeight, this.assets.pipeBg);
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
	// Function:
	//
	GraphicsSystem.prototype.drawBackground = function(bgArray, xPos) {
		this.context.save();
		this.context.scale(1, -1);
		// Draw sky background
		this.context.drawImage(bgArray[1],
			0, 0, 1600, 768,
			1.2, -1, -2.4, 1);
		// Draw desert background
		this.context.drawImage(bgArray[0],
			0, 0, 1600, 768,
			xPos, -1, -2.4, 1);
		this.context.drawImage(bgArray[0],
			0, 0, 1600, 768,
			(2.4 + xPos), -1, -2.4, 1);
		// console.log(xPos);
		if (xPos < -1.2) { this.bgPosX = 1.2; }
		this.context.restore();
	};

	//
	// Function: Draw grid based on given gap size and how many lines should be drawn
	//
	GraphicsSystem.prototype.drawGrid = function(gap, times) {
		this.gap   = gap   || 0.1;
		this.times = times || 10;
		// this.context.save();
		this.context.lineWidth = 0.001;
		this.context.beginPath();
		for (var i = 0; i < (this.gap*this.times); i += this.gap) {
			// Positive y
			this.context.moveTo(-this.gap*this.times, i);
			this.context.lineTo( this.gap*this.times, i);
			// Negative y
			this.context.moveTo(-this.gap*this.times, -i);
			this.context.lineTo( this.gap*this.times, -i);
			// Positive x
			this.context.moveTo(i, -this.gap*this.times);
			this.context.lineTo(i,  this.gap*this.times);
			// Negative x
			this.context.moveTo(-i, -this.gap*this.times);
			this.context.lineTo(-i,  this.gap*this.times);		
		}
		this.context.strokeStyle = "#AAA";
		this.context.stroke();
		// this.context.restore();
	};


exports.GraphicsSystem = GraphicsSystem;