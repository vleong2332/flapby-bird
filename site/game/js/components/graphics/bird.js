//
// BirdGraphicsComponent
//  |_ entity
//  \_ draw()
//

var BirdGraphicsComponent = function(entity) {
   this.entity = entity;
};

   //
   // Function: Draw a circle on canvas
   //
   BirdGraphicsComponent.prototype.draw = function(context) {
      var position = this.entity.components.physics.position;
      var rotation = this.entity.components.physics.rotation.deg;
      var sprite   = this.entity.components.sprite;

      context.save();
      context.translate(position.x, position.y);
      context.scale(1, -1);
      context.rotate(rotation * Math.PI / 180);
      context.drawImage(
         sprite,
         50, 50, -50, -50,
         -0.03, -0.03, 0.06, 0.06);
      // context.translate(-position.x, -position.y);
      // context.scale(-1, 1);
      // context.beginPath();
      // context.arc(0, 0, 0.026, 0, 2 * Math.PI);
      // context.fill();
      // context.closePath();
      context.restore();
   };


exports.BirdGraphicsComponent = BirdGraphicsComponent;