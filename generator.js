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

(function (module) {

	var fs = require('fs'),
		exec = require('child_process').exec;

	module.exports = function (app) {

		var config = {
			app: {},
			services: {}
		};

		app.events.on('validation', function (event, resolve, reject) {
			exec('which apic', function (error, stdout) {
				if (stdout.trim().length === 0) {
					console.log(app.text.bold.yellow('[warning] ') + 'To run this sample locally, please install the API Connect CLI.\n'+
						'To install, type the command `npm install -g apiconnect` in your terminal.\n');
				}

				resolve();
			})
		});

		app.events.on('preferences', function (event, resolve) {
			resolve(config.app = event);
		});

		app.events.on('service', function (event, resolve) {
			resolve(config.services[event.type] = event);
		});

		app.events.on('complete', function (event, resolve) {

			var cloudantService = config.services['cloudantNoSQLDB'],
				path = event.home + '/server/';

			saveFile(path + 'datasources.json', JSON.stringify({
				'Cloudant': {
					database: cloudantService.data[0].name,
					username: cloudantService.credentials.username,
					password: cloudantService.credentials.password,
					name: 'Cloudant',
					connector: 'cloudant'
				}
			}, null, 2)).then(function () {
				var services = {};

				Object.keys(config.services).forEach(function (key) {
					services[key] = [];
					services[key].push(config.services[key]);
				});

				return saveFile(path + 'env.json', JSON.stringify(services, null, 2));
			}).then(function () {
				console.log('Finished copying template\n');
				console.log('Your project has been created at ' + app.text.yellow('projects/') + app.text.yellow(config.app.get('name')) + '\n');
				console.log('Next steps:\n');
				console.log('  First, navigate to your project directory');
				console.log(app.text.green('    $ cd ') + app.text.yellow('projects/') + app.text.yellow(config.app.get('name')) + '\n');
				console.log('  Upload your backend to Bluemix');

				var loginCmd = app.text.green('    $ cf login -a ') + app.text.yellow(config.app.get('region.api'));
				if (config.app.get('username', false)) {
					loginCmd += app.text.green(' -u ') + app.text.yellow(config.app.get('username', false));
				} else {
					loginCmd += app.text.green(' -u [USERNAME]');
				}

				loginCmd += app.text.green(' -o ') +  app.text.yellow(config.app.get('org.name')) + app.text.green(' -s ') +  app.text.yellow(config.app.get('space.name'));

				console.log(loginCmd);

				console.log(app.text.green('    $ cf push\n'));
				console.log('  Compose your API, run, manage, enforce, and deploy it with API Connect locally');
				console.log(app.text.green('    $ npm install'));
				console.log(app.text.green('    $ apic edit\n'));
				console.log('  Redeploy data to Cloudant NoSQL DB and Object Storage');
				console.log(app.text.green('    $ bluegen\n'));
			}).catch(function (e) {
				console.log('  ' + app.text.red.bold('error'), e);
				resolve();
			});
		});

		function saveFile(path, data) {
			return new Promise(function (resolve, reject) {
				fs.writeFile(path, data, function (err) {
					if (err) {
						return reject('Could not save `' + path + '` file.');
					}

					resolve();
				});
			});
		}
	};
})(module);
