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
			var cos = Math.cos( angle );
			var sin = Math.sin( angle );
			var r = self.geometry.radius + 5;
			// create a little circle at the nose of the ship
			// that is traveling at a velocity of 0.5 in the nose direction
			// relative to the ship's current velocity
			var laser = Physics.body('circle', {
				x: self.state.pos.get(0) + r * cos,
				y: self.state.pos.get(1) + r * sin,
				vx: (1.2 + self.state.vel.get(0)) * cos,
				vy: (1.2 + self.state.vel.get(1)) * sin,
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
			var laserAudio = document.getElementById('laser');
			laserAudio.currentTime = 0;
			laserAudio.play();
			return self;
		}
	}
);
