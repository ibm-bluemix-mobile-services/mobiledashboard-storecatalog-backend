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

var vcap_mca = require(__dirname + '/../utils/vcap')('AdvancedMobileAccess'),
		vcap_push = require(__dirname + '/../utils/vcap')('imfpush'),
		vcap_os = require(__dirname + '/../utils/vcap')('Object-Storage'),
		mca = require(__dirname + '/../modules/mobile-client-access'),
		push = require(__dirname + '/../modules/push-notifications'),
		os = require(__dirname + '/../modules/object-storage');

module.exports = function(app) {
	var router = app.loopback.Router();

	// proxy for object storage service
	router.get('/api/Products/image/:container/:file', function(req, res) {
		os(vcap_os.credentials).download(req.params.container, req.params.file, function(download) {
			download.pipe(res);
		});
	});

	// protected endpoint only accessible after mobile app authenticates with mca service
	router.get('/api/Products/protected', mca(app, vcap_mca.credentials), function(req, res) {
		res.send("Hello, this is a protected resource of the mobile backend application!");
	});

	// sends a push notification to mobile devices registered to your service instance
	router.get('/api/Products/push/:message', function(req, res) {
		push(vcap_push.credentials).sendNotification(req.params.message, function(pushResponse) {
			return res.send(pushResponse);
		});
	});

	app.use(router);
}
