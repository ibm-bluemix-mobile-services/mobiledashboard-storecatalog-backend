var fs = require('fs');
var	_ = require('lodash');
var logger = require('winston');

var objectstorage = require('../modules/objectstorage')

// setting object storage variable from vcap to acquire credentials
var objs = null;
if (process.env.VCAP_SERVICES) {
	objs = JSON.parse(process.env.VCAP_SERVICES)['Object-Storage'][0];
}
else {
	try {
		var path = __dirname + '/../env.json';
		fs.statSync(path);
		process.env['VCAP_SERVICES'] = fs.readFileSync(path,'utf8');;
		objs = JSON.parse(process.env.VCAP_SERVICES)['Object-Storage'][0];
	}
	catch (e) {
		logger.error("Could not find VCAP_SERVICES environment variable or the env.json file.");
		logger.error("If you are running from a local environment, you may need to update env.json with the current VCAP_SERVICES environment variable from Bluemix.");
		process.exit(1);
	}
}

if (_.isNull(objs)) {
	logger.error("Object Storage configuration is not valid.");
	process.exit(1);
}

module.exports = function(app) {
	var router = app.loopback.Router();
	router.get('/api/Products/image/:container/:file', objectstorage(objs.credentials).getImage);
	app.use(router);
}
