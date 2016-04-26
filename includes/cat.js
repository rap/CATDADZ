// Define the factory
function Cat(speed, pos, type) {

	var speed = speed || 0.05;
	var pos = pos || [0.5, 0.9];
	var type = type || "default";

	return {

		move: function(p1, p2) {
			var dir = (p1 > p2) ? 1 : -1;
			this.pos += ( dir * this.speed );
		}
	};
}

module.exports = Cat;