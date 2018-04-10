var connect = require('./hue-connect');


connect().then(function(result){
	console.log(result);
})

// var hue = require("node-hue-api"),
// 		https = require("https"),
// 		config = require('./config/config.js');


// var HueApi = hue.HueApi,
// 		lightState = hue.lightState,
// 		hostname,
// 		username = config.username,
// 		state = lightState.create();

// // make https request to discover bridges
// function manualSearch() {

// 	https.get('https://www.meethue.com/api/nupnp', (res) => {
// 	  res.on('data', (d) => {
// 	  	var data = JSON.parse(d.toString());
// 	    hostname = data[0].internalipaddress;
// 			api = new HueApi(hostname, username);
// 			console.log(api);

// 			// send change lights command
// 			// changeLights(commandType, api);
// 	  });

// 	}).on('error', (e) => {
// 	  console.error(e);
// 	});

// }

// hue.nupnpSearch(function(err, result) {
// 	if (err){ 
// 		console.log(err);
// 		// throw err
// 		manualSearch();
// 		return;
// 	}
// 	else{
// 		console.log('workin');
// 		// displayBridges(result);
// 	}
// });

// var displayResult = function(result) {
// 		console.log("Lights: " + JSON.stringify(result, null, 2));
// };