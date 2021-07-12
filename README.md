

# Run on Google cloud
* Create a project and associate it to a billing ID
* Open a shell [terminal](https://shell.cloud.google.com/?show=terminal) into google cloud
* Set the following environment variables variables.  The project name will need to be unique.
```
export PROJECT=? 
```

* Set the project and region
```
gcloud config set project $PROJECT
gcloud config set run/region us-central1
```
* Enable APIs
```
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

* Clone the application and change directories to it
```
git clone https://github.com/craigivy/node-automl.git
cd node-automl/
```

* Deploy the app to cloud run
```
gcloud beta run deploy node-automl --source .
```

## Run in the cloud shell
* Open a shell [terminal](https://shell.cloud.google.com/?show=terminal) into google cloud

* Install dependencies:
```
npm install
```

* Run the app:
```
DEBUG=myapp:* npm start
```

## More

Originally generated with:
```
$ npx express-generator --view=hbs --git node-automl
```

