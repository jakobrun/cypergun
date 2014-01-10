define(
	[
		'physicsjs',
		'physicsjs/bodies/circle',
		'physicsjs/bodies/convex-polygon',
	],
	function(
		Physics
	){
		'use strict';
		return function (self){
			var world = self._world;
			if (!world){
				return self;
			}
			var angle = self.state.angular.pos;
			var cos = Math.cos( angle);
			var sin = Math.sin( angle);
			var r = self.geometry.radius + 5;
			// create a little circle at the nose of the ship
			// that is traveling at a velocity of 0.5 in the nose direction
			// relative to the ship's current velocity
			function shoot (vxAng, vyAng) {
				var speed = Math.pow(self.state.vel.get(0), 2) + Math.pow(self.state.vel.get(1), 2);
				console.log(self.state.vel.get(0), speed);
				var laser = Physics.body('circle', {
					x: self.state.pos.get(0) + r * vxAng,
					y: self.state.pos.get(1) + r * vyAng,
					vx: (0.5 + self.state.vel.get(0)) * vxAng,
					vy: (0.5 + self.state.vel.get(1)) * vyAng,
					radius: 2

				});
				// set a custom property for collision purposes
				laser.gameType = 'laser';

				// remove the laser pulse in 600ms
				setTimeout(function(){
					world.removeBody( laser );
					laser = undefined;
				}, 600);
				world.add( laser );
			}
			shoot(cos, sin);
			//shoot(Math.cos(angle + 0.2), Math.sin(angle + 0.2));
			//shoot(Math.cos(angle - 0.2), Math.sin(angle - 0.2));

			var audio = document.getElementById('shotgun');
			audio.currentTime = 0;
			audio.play();
			return self;
		}
	}
);
