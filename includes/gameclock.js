// Define the factory
function GameClock() {

	var intervals = [];

	return {

		poll: function(io, socketArray, cat) {

			// assume only two sockets for now, we will govern this later through two-person rooms"
			// TODO: orchestrate polling with room creation/deletion
			intervals.push(setInterval(function(){
				// cat.move(socketArray[0].report(), socketArray[1].report());
				
				var report = socketArray[0].player.report();
				io.emit('pulse', report);
			}, 1000, io, socketArray, cat));
		}
	};
}

// TODO: method for removing setIntervals once room is closed

module.exports = GameClock;

