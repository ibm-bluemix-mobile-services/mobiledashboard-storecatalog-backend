# Store Catalog Mobile Backend Data
This folder contains a dynamic scripts that generate and upload the data we want to store on Cloudant in addition to instructions of how to upload data to Object Storage on Bluemix.

### Before you begin
Ensure that you have:

* Provisioned your Bluemix application by following the instructions in the [provision/](https://github.ibm.com/jmeis/app-builder-commerce-server/tree/master/provision) folder

#### Uploading images to Object Storage
The data in this folder contain a [clothes/](https://github.ibm.com/jmeis/app-builder-commerce-server/tree/master/data/os/clothes) directory which contains the images used for this example. Since our project is now on Bluemix, we can upload these images to our Object Storage.

Click the `Object Storage` service on your application's Overview page on Bluemix. Create a new container called `commerce` and upload the images from the [clothes/](https://github.ibm.com/jmeis/app-builder-commerce-server/tree/master/data/os/clothes) folder into that container on Bluemix.

![Object Storage](readme/1.png?raw=true "Object Storage")

#### Uploading data to Cloudant
The [cloudant/](https://github.ibm.com/jmeis/app-builder-commerce-server/tree/master/data/cloudant) folder has two shell scripts. Provide the application `ROUTE` into the `products.sh` script, run `sh products.sh`, and it will dynamically generate a `products.json` file from the `products-template.json` file used for this sample.

The `create.sh` pushes this `products.json` file to a database called `products` on Cloudant. All you have to do before you run the shell script is provide your `CLOUDANT_USERNAME` and `CLOUDANT_PASSWORD`.

You can get your Cloudant credentials by visiting your application's Overview page and expanding the `Show Credentials` for the Cloudant service.

![Cloudant Credentials](readme/2.png?raw=true "Cloudant Credentials")
