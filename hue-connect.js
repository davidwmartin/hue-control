///// Imports and such
var hue = require('node-hue-api'),
		config = require('./config/config'), 
		request = require('request');


// configure hue stuff
var HueApi = hue.HueApi,
		lightState = hue.lightState,
		username = config.username,
		state = lightState.create();


///// promises for finding hue bridge on your current network

// auto-find (node-hue-api built in nupnpsearch function)
let autoFind = new Promise(function(resolve, reject){
	
	hue.nupnpSearch(function(err, result) {
		if (err) {
			reject(err);
		};
		resolve(result);
	});

});

// "manual" find - http request directly to hue api
let manualFind = new Promise(function(resolve, reject) {

  request('https://www.meethue.com/api/nupnp', {json:true}, (err, res, body) =>{
		if (err) { reject(err); }
		resolve(res.body);
	});

});



// attempts to find bridges automatically, falls back to manual hue-api request if that fails, returns api object (this function is exported below)
function bridgeConnect(){
	var hostname, api;

	return autoFind
		.then(function(autoData){
			hostname = autoData[0].ipaddress;
			api = new HueApi(hostname, username);
			return api;
			// console.log(api);
		})
		.catch(function(err){
			console.error('oops!', err);

			// TODO -- not sure this is proper way to implement promise pattern (second promise nested here...)
			manualFind.then(function(manData){
				hostname = manData[0].internalipaddress;
				api = new HueApi(hostname, username);
				return api;
				// console.log('manual api', api);
			});
		});

}

module.exports = bridgeConnect;
