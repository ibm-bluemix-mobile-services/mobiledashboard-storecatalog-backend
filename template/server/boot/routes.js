/*
 * Copyright 2016 IBM Corp.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var fs = require('fs');
var	_ = require('lodash');
var logger = require('winston');

var objectstorage = require('../modules/object-storage')

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
