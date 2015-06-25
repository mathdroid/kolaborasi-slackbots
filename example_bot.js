//////////////////////////////////////////////////////////////////
//		███████╗██╗      █████╗  ██████╗██╗  ██╗ 	//
//		██╔════╝██║     ██╔══██╗██╔════╝██║ ██╔╝ 	//
//		███████╗██║     ███████║██║     █████╔╝ 	//
//		╚════██║██║     ██╔══██║██║     ██╔═██╗		//
//		███████║███████╗██║  ██║╚██████╗██║  ██╗	//
//		╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝	//
//		    14-12-14 | xBytez | me@xbytez.eu		//
//////////////////////////////////////////////////////////////////

// Requiring our module
var slackAPI = require('slackbotapi');
var request = require('request');

// Starting
var slack = new slackAPI({
	'token': "xoxb-6748996928-BaamLe3i9nPXawG6ZHnxOuZU",
	'logging': true
});

// Slack on EVENT message, send data.
slack.on('message', function(data) {
	// If no text, return.
	if(typeof data.text == 'undefined') return;
	// If someone says 'cake!!' respond to their message with "@user OOH, CAKE!! :cake"
	if(data.text === 'cake!!') slack.sendMsg(data.channel, "@"+slack.getUser(data.user).name+" OOH, CAKE!! :cake:")

	// If the first character starts with %, you can change this to your own prefix of course.
	if(data.text.charAt(0) === '%') {
		// Split the command and it's arguments into an array
		var command = data.text.substring(1).split(' ');

		// If command[2] is not undefined use command[1] to have all arguments in comand[1]
		if (typeof command[2] != "undefined") {
			for (var i = 2; i < command.length; i++) {
				command[1] = command[1] + ' ' + command[i];
			}
		}

		// Switch to check which command has been requested.
		switch (command[0].toLowerCase()) {
			// If hello
			case "hello":
				// Send message.
				slack.sendMsg(data.channel, "Oh, hello @"+slack.getUser(data.user).name+" !")
			break;

			case "hue":
				slack.sendMsg(data.channel, "@"+slack.getUser(data.user).name+" brbrbrbrbrb!")
			break;

			case "say":
				var say = data.text.split('%say ');
				slack.sendMsg(data.channel, say[1]);
			break;

			case "weather":
				request.get(
					'http://api.openweathermap.org/data/2.5/weather?units=metric&lat=-6.16&lon=106.83',
			    {},
			    function (error, response, body) {
						var msg = {};
						var arr = [];
		        if (!error && response.statusCode == 200) {
							// slack.sendMsg(body);
							msg = JSON.parse(body);
							arr = msg.weather;
		          console.log(body);
		          console.log(msg.weather);
							console.log(arr.length);
							slack.sendMsg(data.channel, arr[0].description)
							// for (var wthr in arr) {
							// 	console.log(wthr);
							// 	// slack.sendMsg(data.channel, weather.description);
							// }
		        }
			    }
				);
			break;
			case "toggle":
				request.post(
					'http://modulair.muhammadmustadi.com/v1/subsystems/55113c458302d32802674d8c/toggle/1',
					{},
					function (error, response, body) {
						var msg = {};
						var arr = [];
						if (!error && response.statusCode == 200) {
							// slack.sendMsg(body);
							// msg = JSON.parse(body);
							// arr = msg.weather;
							// console.log(body);
							// console.log(msg.weather);
							// console.log(arr.length);
							slack.sendMsg(data.channel, "done.");
							// for (var wthr in arr) {
							// 	console.log(wthr);
							// 	// slack.sendMsg(data.channel, weather.description);
							// }
						}
					}
				);
			break;
			case "debug":
				console.log(slack.data.ims);
			break;
		}
	}
});
