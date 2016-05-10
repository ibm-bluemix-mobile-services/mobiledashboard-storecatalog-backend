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
					return reject('Please install the API Connect CLI.\n' +
						'To install, type the command `npm install -g apiconnect` in your terminal.');
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
					database: cloudantService.db,
					username: cloudantService.credentials.username,
					password: cloudantService.credentials.password,
					name: 'Cloudant',
					connector: 'cloudant'
				}
			})).then(function () {
				var services = {};

				Object.keys(config.services).forEach(function (key) {
					services[key] = [];
					services[key].push(config.services[key]);
				});

				return saveFile(path + 'env.json', JSON.stringify(services));
			}).then(function () {
				console.log('Finished copying template\n');
				console.log('Your project has been created at ' + app.text.yellow('projects/') + app.text.yellow(config.app.name) + '\n');
				console.log('Next steps:\n');
				console.log('  Navigate to your project directory');
				console.log(app.text.green('    $ cd ') + app.text.yellow('projects/') + app.text.yellow(config.app.name) + '\n');
				console.log('  Upload your backend to Bluemix');
				console.log(app.text.green('    $ cf login -a ') + app.text.yellow(config.app.region) + app.text.green(' -u ') + app.text.yellow(config.app.username) + app.text.green(' -o ') +  app.text.yellow(config.app.org.name) + app.text.green(' -s ') +  app.text.yellow(config.app.space.name));
				console.log(app.text.green('    $ cf push\n'));
				console.log('  Compose your API, run, manage, enforce, and deploy it with API Connect');
				console.log(app.text.green('    $ npm install'));
				console.log(app.text.green('    $ apic edit\n'));
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
