// Component declaration
// Will initialized when created in entity
var BirdGraphicsComponent = function(entity) {
	// Tag which entity this component belongs to
	this.entity = entity;
	// Thinkful starting point
	this.thinkStartx = 150;
	this.thinkStarty = 30;
	// Circle starting point
	this.radius           = 20;
	this.startx            = this.thinkStartx + (1.5*this.radius);
	this.starty            = this.thinkStarty + (0.5*this.radius);
	this.posx              = this.startx;
	this.posy              = this.starty;
	this.lineThickness     = this.radius;
	this.circleMovingState = "down";
	this.loop              = 0; //Even loop = going up; Odd loop = going down
};

// Declare draw()
// Will be called by systems
// Access syntax: (BirdGraphicsComponent).draw()
BirdGraphicsComponent.prototype.draw = function(context) {
	context.beginPath();
	// Modify circle moving direction depending on coordinates
	// Top left hole
	if ((this.posx == this.startx) && (this.posy == this.starty)) {
			this.circleMovingState = "down";
			this.loop++;
	}
	// Top right side of T
	else if ((this.posx == this.startx) && (this.posy == this.starty+20)) {
		if (this.loop % 2)
			this.circleMovingState = "left";
		else
			this.circleMovingState = "up";
	}
	// Top middle of T
	else if ((this.posx == this.startx-60) && (this.posy == this.starty+20)) {
		if (this.loop % 2)
			this.circleMovingState = "down";
		else
			this.circleMovingState = "right";
	}
	// Bottom middle of T
	else if ((this.posx == this.startx-60) && (this.posy == this.starty+140)) {
		if (this.loop % 2)
			this.circleMovingState = "left";
		else
			this.circleMovingState = "up";
	}
	// Bottom left hole
	else if ((this.posx == this.startx-80) && (this.posy == this.starty+140)) {
		this.circleMovingState = "right";
		this.loop++;
	}

	// Move circle depending on the state
	switch (this.circleMovingState) {
		case "down":
			context.arc(this.posx, this.posy++, this.radius, 0, 2 * Math.PI);
			break;
		case "up":
			context.arc(this.posx, this.posy--, this.radius, 0, 2 * Math.PI);
			break;
		case "left":
			context.arc(this.posx--, this.posy, this.radius, 0, 2 * Math.PI);
			break;
		case "right":
			context.arc(this.posx++, this.posy, this.radius, 0, 2 * Math.PI);
			break;
		default:
			break;
	}
	context.fillStyle = 'rgb(100, 0, 0)';
	context.fill();

	// Thinkful logo
	context.lineWidth = this.lineThickness;
	context.lineCap = 'square';
	context.beginPath();
	context.moveTo(this.thinkStartx, this.thinkStarty);
	context.lineTo(this.thinkStartx-120, this.thinkStarty);
	context.lineTo(this.thinkStartx-120, this.thinkStarty+60);
	context.lineTo(this.thinkStartx-60,  this.thinkStarty+60);
	context.lineTo(this.thinkStartx-60,  this.thinkStarty+120);
	context.strokeStyle = "blue";
	context.stroke();
	context.closePath();

	context.beginPath();
	context.moveTo(this.thinkStartx-60, this.thinkStarty+180);
	context.lineTo(this.thinkStartx,    this.thinkStarty+180);
	context.lineTo(this.thinkStartx,    this.thinkStarty+60);
	context.lineTo(this.thinkStartx+60, this.thinkStarty+60);
	context.lineTo(this.thinkStartx+60, this.thinkStarty);
	context.stroke();
	context.closePath();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;