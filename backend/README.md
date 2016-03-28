# Store Catalog Mobile Backend
This folder contains instructions on how to run API Connect, connect your sample to the datasources created earlier, and deploying the sample live on Bluemix.

### Before you begin
Ensure that you have:

* Provisioned your Bluemix application by following the instructions in the [provision/](https://github.ibm.com/jmeis/app-builder-commerce-server/tree/master/provision) folder
* Supplied data to your Bluemix application by following the instructions in the [data/](https://github.ibm.com/jmeis/app-builder-commerce-server/tree/master/data) folder
* The [API Connect CLI](https://www.npmjs.com/package/apiconnect) tool installed
* Ensured that you are still in the right region, organization, and space by running `cf target`

### Directory structure
    ├── api                     # Top directory of the API Connect application
    │   ├── client              # Contains the frontend files seen when we hit the application on Bluemix
    │   ├── definitions         # Auto-generated .yaml files from API Connect containing api definitions
    │   ├── server              # Parent directory containing all of the routing, loopback, modules, installation, etc. files
    |   │   ├── boot            # Contains routes.js which establishes our Object Storage proxy router
    |   │   ├── install         # Contains two installation scripts: one recovers your VCAP_SERVICES from Bluemix while the other auto-generates a Cloudant connector to API Connect
    |   │   ├── models          # Auto-generated Model files from API Connect
    |   │   ├── modules         # Contains our custom Object Storage module which authenticates to the service and pipes out a requested image
    |   │   ├── ...             # Misc.
    |   │   └── server.js       # The primary server file of the sample
    │   └── package.json        # Contains name, version, description, scripts, dependencies, etc. of the application

### Installation
1. Ensure that you are logged and and in the correct region in Cloud Foundry.
2. Run `npm run local` which will download your `VCAP_SERVICES` environment variable from Bluemix and will write it to the file `env.json` (This way we can have the Node application use `env.json` as an environment variable when we run our application locally. It stores the credentials necessary to authenticate to our Bluemix services).
3. Run `npm install` to download all of the required dependencies.
4. Run `npm run datasources` to connect your Cloudant datasource to API Connect  
       Note: The datasources.js file is also configured in the package.json to
       run post install. This is so when the backend is pushed to Bluemix,
       API Connect can successfully connect to Cloudant. It may be necessary to
       modify this or rename the database parameter in the connector for your
       own project (e.g. if your database isn't called "products").

### Running API Connect
To run API Connect, type the following command while inside the [api/](https://github.ibm.com/jmeis/app-builder-commerce-server/tree/master/backend/api) directory:

`apic edit`

<img src="readme/1.png"/>

The API Connect UI allows us to easily see a graphical interface of the currently implemented API. Browse through the `Products`, `APIs`, `Models`, and `Data Sources` tab to familiarize yourself with the sample.

Click the `Run` tab in the top right hand corner to start the server. After the server is started, click the `Explore` tab to see and test the API.

    Note: The Object Store proxy router will not render images until you publish your application to Bluemix.

### Publishing to Bluemix
To publish your local application to Bluemix, use the command:

`cf push`

This will use the `manifest.yml` file generated when we provisioned the application to upload the project on Bluemix.

### Using the App Builder Commerce application and API
You will see an App Builder Commerce web application when you visit the app route. You will be welcomed by a page that displays information about this sample.

<img src="readme/2.png"/>

> Click **View API Reference** on the web UI to see the API specs.
