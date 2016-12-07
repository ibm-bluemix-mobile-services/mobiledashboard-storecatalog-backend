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

var request = require('superagent');

module.exports = function(creds) {
	var baseUrl = 'https://mobile.ng.bluemix.net';

	return {
		sendNotification: function(message, cbk) {
			var message = {
				"message": {
					"alert": message
				}
			};

			request
			 .post(baseUrl + '/imfpush/v1/apps/' + creds.appGuid + '/messages')
			 .send(message)
			 .set('Content-Type', 'application/json')
			 .set('Accept', 'application/json')
			 .set('appSecret', creds.appSecret)
			 .end(function(err, res) {
					cbk(res.body) || cbk(err);
			 });

		}
	};
};
