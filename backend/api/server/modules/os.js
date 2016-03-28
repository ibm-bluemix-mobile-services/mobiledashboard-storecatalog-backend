var pkgcloud = require('pkgcloud-bluemix-objectstorage');

module.exports = function(creds) {
  // constructing configuration for pkgcloud
  // uses vcap credentials to authenticate
  var config = {};
  config.provider = "openstack";
  config.authUrl = 'https://identity.open.softlayer.com/';
  config.region= 'dallas';
  config.useServiceCatalog = true;
  // true for apps inside bluemix, otherwise false
  config.useInternal = false;
  config.tenantId = creds.projectId;
  config.userId = creds.userId;
  config.username = creds.username;
  config.password = creds.password;
  config.auth = {
    forceUri  : "https://identity.open.softlayer.com/v3/auth/tokens",
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
