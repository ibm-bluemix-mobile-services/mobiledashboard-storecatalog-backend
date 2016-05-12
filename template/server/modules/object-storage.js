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

var pkgcloud = require('pkgcloud-bluemix-objectstorage');

module.exports = function(creds) {
	// constructing configuration for pkgcloud
	// uses vcap credentials to authenticate
	var config = {};
	config.provider = "openstack";
	config.authUrl = creds.auth_url;
	config.region= creds.region;
	config.useServiceCatalog = true;
	// true for apps inside bluemix, otherwise false
	config.useInternal = false;
	config.tenantId = creds.projectId;
	config.userId = creds.userId;
	config.username = creds.username;
	config.password = creds.password;
	config.auth = {
		forceUri	: "https://identity.open.softlayer.com/v3/auth/tokens",
		// use public for apps outside bluemix and internal for apps inside bluemix
		interfaceName : "public",
		"identity": {
			"methods": [
				"password"
			],
			"password": {
				"user": {
					"id": creds.userId,
					"password": creds.password
				}
			}
		},
		"scope": {
			"project": {
				"id": creds.projectId
			}
		}
	};

	return {
		getImage: function(req, res) {
			// creates a pkgcloud storage client
			var storageClient = pkgcloud.storage.createClient(config);
			storageClient.auth(function (error) {
				if (error) {
					console.error("storageClient.auth() : error creating storage client: ", error);
				}
				else {
					// this is using the pkgcloud api
					// we are piping the requested file from the requested container into the response
					storageClient.download({
						container: req.params.container,
						remote: req.params.file
					}).pipe(res);
				}
			});
		}
	};
};
