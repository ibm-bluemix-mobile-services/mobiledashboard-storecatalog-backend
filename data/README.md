# Store Catalog Mobile Backend Data
The [cloudant/](cloudant) folder contains dynamic scripts that generate and upload the data to store on Cloudant. The [os/](os) folder contains images to upload for the Object Storage service on Bluemix.

### Before you begin
Ensure that you have:

* Provisioned your Bluemix application by following the instructions in the [provision/](../provision) folder.

#### Uploading images to Object Storage
The data in this folder contains a [clothes/](os/clothes) folder which contains the images that are used for this example. Since our project is now on Bluemix, we can upload these images to our Object Storage service instance.

Click the **Object Storage** service on your application's **Overview** page on Bluemix. Create a new container called `commerce` and upload the images from the [clothes/](os/clothes) folder into that container on Bluemix.

![Object Storage](readme/1.png?raw=true "Object Storage")

#### Uploading data to Cloudant
The [cloudant/](cloudant) folder has two shell scripts. The [`products.sh`](cloudant/products.sh) script creates a `products.json` file from the [`products-template.json`](cloudant/products-template.json) file with your custom application route. The [`create.sh`](cloudant/create.sh) script pushes the `products.json` file to a database called `products` on Cloudant.

1. Get your Cloudant credentials by visiting your application's **Overview** page and expanding **Show Credentials** for the Cloudant service.
  ![Cloudant Credentials](readme/2.png?raw=true "Cloudant Credentials")
2. Provide the application `ROUTE` in the [`products.sh`](cloudant/products.sh) script and run `sh products.sh`.
3. Provide your `CLOUDANT_USERNAME` and `CLOUDANT_PASSWORD` in the [`create.sh`](cloudant/create.sh) script and run `sh create.sh`.

