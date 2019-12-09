var sceneTimes = require('../config/scene-times.js'),
		getSunData = require('./get-sundata.js');

// gets sunset time, compares against current time and selects a scene from config object based on offsets defined therein
async function getSceneByTime() {
	var now = new Date();

	var sunset, sunrise, desiredSceneId;

	await getSunData().then(function(result){
		sunset = new Date(result.sunset);
	});
	var sunsetOffset = (now - sunset) / 1000 / 60; // convert to minutes
	for (var i = sceneTimes.length - 1; i >= 0; i--) {
		if (sceneTimes[i].offset < sunsetOffset) {
			desiredSceneId = sceneTimes[i].scene;
			break;
		}
		else {
			// TODO - this is a fallback / default for when current time is before any offsets (i.e. after midnight, but before the first defined scene)
			desiredSceneId = sceneTimes[sceneTimes.length - 1].scene;
		}
	}
	return desiredSceneId;
}

module.exports = getSceneByTime;