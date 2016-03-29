# Store Catalog Mobile Backend for Bluemix Mobile Services
The Store Catalog Mobile Backend is a sample that demonstrates Mobile Services integration with **API Connect**, **Cloudant NoSQL DB**, and **Object Storage** services on Bluemix. The sample exhibits common architectural design patterns that developers can use to model their backend on Bluemix for mobile applications.

This repository contains an example of a backend that would be created for a Store Catalog mobile application with the ability to browse the products and view the name, price, rating, description, image, etc. about each product that is available at a store.

### Architecture Diagram
<img src="readme/1.png"/>

### Sample Flow
The [provision/](provision) folder contains instructions on how to set up your application on Bluemix, the [data/](data) folder contains a simple shell script to push data to Cloudant in addition to instructions on how to set up Object Storage, and the [backend/](backend) folder contains the Store Catalog Mobile Backend running API Connect.

1. Provision a Bluemix backend with the necessary services by running the [`create.sh`](provision/create.sh) script in the [provision/](provision) folder.
2. Supply the Cloudant and Object Storage data for the sample by following the instructions in the [data/](data) folder.
3. Connect to your datasources, run the sample, and deploy to Bluemix by following the instructions in the [backend/](backend) folder.

### License
This package contains sample code provided in source code form. The samples are licensed under the Apache License, Version 2.0 (the "License"). You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 and may also view the license in the LICENSE file within this package.
