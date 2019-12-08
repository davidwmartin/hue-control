var http = require('http'),
		config = require('../config/config.js');


////// Make call to sunrise-sunset API to get sun timing info for today
function getSunData() { 

	// request vars
	var options = {
		// params for lattitude + longitude, date, formatting
		host: 'http://api.sunrise-sunset.org/json?lat='+config.lattitude+'&lng='+config.longitude+'&date=today&formatted=0'
	}

	return new Promise(function(resolve, reject) {

		// executes http request to get sunset time
		http.get(options.host, function(res){
			var data = "";
		  
		  res.setEncoding('utf8');
		  res.on('data', function (chunk) {
		  	var sunData = JSON.parse(chunk);
		  	resolve(sunData.results);
		  });
		});


	});

}

module.exports = getSunData;