# Store Catalog Mobile Backend for Bluemix Mobile Services
The Store Catalog Mobile Backend is a sample that demonstrates Mobile Services integration with API Connect, Cloudant, and Object Storage.

This repository contains a sample backend for an application running on Bluemix, illustrating common architectural design patterns. The [provision/](provision) folder contains instructions on how to set up your application on Bluemix, the [data/](data) folder contains a simple shell script to push data to Cloudant in addition to instructions on how to set up Object Storage, and the [backend/](backend) folder contains the Store Catalog Mobile Backend running API Connect.

### Sample Flow
1. Provision a Bluemix backend with the necessary services by running the `create.sh` script in the [provision/](provision) folder.
2. Supply the Cloudant and Object Storage data for the sample by following the instructions in the [data/](data) folder.
3. Connect to your datasources, run the sample, and deploy to Bluemix by following the instructions in the [backend/](backend) folder.

### License
This package contains sample code provided in source code form. The samples are licensed under the Apache License, Version 2.0 (the "License"). You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 and may also view the license in the LICENSE file within this package.
