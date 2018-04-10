// requires
var fs = require('fs'), 
		hue = require('node-hue-api'),
		config = require('./config/config.js')
		;

// define some vars
var HueApi = hue.HueApi,
		lightState = hue.lightState,
		hostname,
		username = config.username,
		state = lightState.create();


// get command type from bash command, parse
var commandType = process.argv[2];
lightChange(commandType);


function lightChange(commandType) {

	// returns array of bridges
	hue.nupnpSearch()
		.then(function(bridges){

			// choose the first one
			hostname = bridges[0].ipaddress;
			api = new HueApi(hostname, username);
			// send change lights command
			changeLights(commandType, api);
		})
		.done();

}


// parses command, changes lights
function changeLights(commandType, api){

	var sceneId;

	switch (commandType){
		case 'on':
			sceneId = '44vKzz9DvQNo46l';
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
			sceneId = '7zvcIvzkvl2IBu-';
			break;

		case 'afternoon':
			sceneId = 'SzTWcta-JSvvPj1';
			break;

		case 'evening':
			sceneId = 'cY8fTLp2Ev3oozI';
			break;

		case 'cray':
			sceneId = 'PVB-BYTBE2OzN7j';
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