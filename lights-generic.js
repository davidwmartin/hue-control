// requires
var fs = require('fs'), 
		hue = require('node-hue-api'),
		config = require('./config/config.js'),
		connect = require('./hue-connect.js')
		;

// define some vars
var HueApi = hue.HueApi,
		lightState = hue.lightState,
		hostname,
		username = config.username,
		state = lightState.create();


// get scene ID from bash command (second argument)
// e.g. "node lights-generic.js <sceneId>"
var sceneId = process.argv[2];

// connect to bridge (via hue-connect.js -- exports a promise that resolves with a node-hue-api api object)
connect().then(function(data){
	
	var api = data;
	setSceneById(sceneId, api);

	} ,function(err){
		console.error(err);
});


// Changes light scene based on passed in scene ID
function setSceneById(sceneId, api){
	api.activateScene(sceneId)
		.then(console.log('changed scene to ' + sceneId));
}