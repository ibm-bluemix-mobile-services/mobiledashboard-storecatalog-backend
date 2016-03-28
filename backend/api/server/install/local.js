var fs = require('fs');
var exec = require('child_process').exec;
var cfenv = require("cfenv")

var name = cfenv.getAppEnv().name

// parse the vcap
function parseRawDoc(raw) {
  var start = raw.indexOf('{'), end = raw.lastIndexOf('}') + 1;
  var unparseDocs = '[' + raw.substr(start, end-start).replace(/\}[ . \n]*\{/g, '},{') + ']';
  return JSON.parse(unparseDocs);
}

// write the vcap to local system
function success(vcap) {
  fs.writeFile(__dirname + '/../env.json', JSON.stringify(vcap, null, 2), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("Wrote results of VCAP environment variable to env.json.")
  });
}

function set(error, stdout, stderr) {
  var env = parseRawDoc(stdout)[0];
  success(env.VCAP_SERVICES)
}

console.log("Creating VCAP_SERVICES environment variable...");
exec("cf env " + name, set);
