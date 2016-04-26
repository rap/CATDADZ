// Define the factory
function Player(id) {

	var id = id || 0;
	var type = 0;
	var click = 0;

	return {
		addKey: function() {
			type++;
		},

		addClick: function() {
			click++;
		},

		report: function() {
			var rates = [ type, click ];
			type = 0;
			click = 0;
			return rates;
		}
	}
}

// TODO: method for removing setIntervals once room is closed

module.exports = Player;

