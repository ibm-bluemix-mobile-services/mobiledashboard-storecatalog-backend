var fs = require('fs');
var	_ = require('lodash');
var logger = require('winston');

// setting cloudant variable from vcap to acquire credentials
var cloudant = null;
if (process.env.VCAP_SERVICES) {
  cloudant = JSON.parse(process.env.VCAP_SERVICES)['cloudantNoSQLDB'][0];
}
else {
  try {
    var path = __dirname + '/../env.json';
    fs.statSync(path);
    process.env['VCAP_SERVICES'] = fs.readFileSync(path,'utf8');
    cloudant = JSON.parse(process.env.VCAP_SERVICES)['cloudantNoSQLDB'][0];
  }
  catch (e) {
    logger.error("Could not find VCAP_SERVICES environment variable or the env.json file.");
    logger.error("If you are running from a local environment, make sure you run 'npm run local' first to get the VCAP_SERVICES variable from Bluemix.");
    process.exit(1);
  }
}

if (_.isNull(cloudant)) {
  logger.error("Cloudant configuration is not valid.");
  process.exit(1);
}

// update API Connect connector to use current Cloudant database
var file = 'datasources.json'
var datasources = {
  "Cloudant": {
    "database": "products",
    "username": cloudant.credentials.username,
    "password": cloudant.credentials.password,
    "name": "Cloudant",
    "connector": "cloudant"
  }
}

// generating datasources.json
fs.writeFile(__dirname + '/../datasources.json', JSON.stringify(datasources, null, 2), function(err) {
  if(err) {
    return console.log(err);
  }
  console.log("Cloudant connector for API Connect successfully generated!");
});
