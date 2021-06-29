// requires
var fs = require('fs'), 
		hue = require('node-hue-api'),
		config = require('./config/config.js'),
		connect = require('./lib/hue-connect.js'),
		getSceneByTime = require('./lib/get-scene-by-time.js')
		;

// define some vars
var HueApi = hue.HueApi,
		lightState = hue.lightState,
		hostname,
		username = config.username,
		state = lightState.create();


// get command type from bash command, parse
var commandType = process.argv[2];

// connect to bridge (via hue-connect.js -- exports a promise that resolves with a node-hue-api api object)
connect().then(function(data){
	var api = data;
	changeLights(commandType, api);

	} ,function(err){
		console.error(err);
});


// parses command, changes lights
async function changeLights(commandType, api){

	var sceneId;

	switch (commandType){
		case 'on':
			sceneId = await getSceneByTime();
			break;

		case 'off':
			api.setGroupLightState(1, state.off())
			.then(displayResult(commandType))
			.done();
			return;

		case 'bright':
			sceneId = 'eL1TQfrb8mmUfjS';
			break;

		case 'dim':
			sceneId = 'Dn0iPwOfg076cME';
			break;

		case 'morning':
			sceneId = 'w0H0sWrsfetnqWF';
			break;

		case 'day':
			sceneId = 'SzTWcta-JSvvPj1';
			break;

		case 'afternoon':
			sceneId = 'nPzFJn-u6d-vkbU';
			break;

		case 'evening':
			sceneId = 'cY8fTLp2Ev3oozI';
			break;

		case 'cray': 
		case 'weird':
			sceneId = 'PVB-BYTBE2OzN7j';
			break;

		case 'outrun':
			sceneId = 'av6fwtnAEcgSozn';
			break;

		case 'forest':
		case 'enchanted':
			sceneId = '89SvYOY8ZjN9wx0';
			break;

		default:
			console.log('command not recognized');
			return;
	}

	api.activateScene(sceneId)
		.then(displayResult(commandType))
		.done();
}

// util function to print result to console
var displayResult = function(result) {
		console.log("Lights: " + JSON.stringify(result, null, 2));
};