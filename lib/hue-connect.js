/******
**** Hue bridge finding and connection module
******/

///// Imports and such
var hue = require('node-hue-api').v3,
		request = require('request'),
		config = require('../config/config');


// configure hue stuff
var HueApi = hue.HueApi,
		lightState = hue.lightState,
		username = config.username;

async function bridgeConnect() {
	let searchResults;

	try {
		searchResults = await hue.discovery.nupnpSearch();
		// console.log(JSON.stringify(searchResults, null, 2));

		if (!searchResults.length) {
			searchResults = await hue.discovery.upnpSearch(1000);
			// console.log(JSON.stringify(searchResults, null, 2));
		}
	}
	catch (err) {
		console.log('connect error: ', err);
	}

	let bridge = hue.api.createLocal(searchResults[0].ipaddress).connect(username);

	return bridge;
}

let bridgeData = bridgeConnect();

// console.log(bridgeData);


module.exports = bridgeConnect;
