// requires
var fs = require('fs'), 
		hue = require('node-hue-api'),
		config = require('./config/config.js'),
		connect = require('./hue-connect.js')
		;


// define some vars
var HueApi = hue.HueApi,
		hostname,
		username = config.username;


// connect to bridge (via hue-connect.js -- exports a promise that resolves with a node-hue-api api object)
connect().then(function(data){
	var api = data;

	api.scenes(function(err, result){
		if (err){
			console.log(err);
		}
		displayResult(result);
	});

	} , function(err){
		console.error(err);
});


// util function to print result to console
function displayResult(result) {
	fs.writeFile('./data/scenes.json',JSON.stringify(result, null, 2));
};

