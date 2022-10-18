// Install GCP Client library
//    npm install --save @google-cloud/storage
// To run the client library, you must first set up authentication by creating a service account
// and setting an environment variable. Ask your DevOps person to provide you with service account key
// For example:
//    export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/[FILE_NAME].json"

// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');



// Creates a GCP Storage client
const storage = new Storage({
    projectId: "adtest-365508",
});

// Declare the bucket you wanna upload the files
const bucketName = "my-phone-test-bucket";
 

// uncomment for inital bucket creation

/* 
  async function createBucket() {
    // Creates the new bucket
    await storage.createBucket(bucketName);
    console.log(`Bucket ${bucketName} created.`);
  }
  
  createBucket().catch(console.error);
*/

/* 
// Downloading non-public file
// 
const srcFilename = "download.zip";
const destFilename = "./download.zip";

// Downloads the file from bucket
await storage
  .bucket(bucketName)
  .file(srcFilename)
  .download({
      destination: destFilename
  });

console.log(`GS://${bucketName}/${srcFilename} downloaded to ${destFilename}.`);
 */

// 
// Uploading a local file to the bucket
// 

storage
  .bucket(bucketName)
  .upload("phone_prices.json", { destination: '/my_phone_tables/phone_prices.json' })
  .then(() => {
    console.log('success');
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

/* 
// Upload FileStream
const file = bucket.file(gcsname);

const stream = file.createWriteStream({
    metadata: {
        contentType: req.file.mimetype
    },
    resumable: false
});

stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
});

stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
    });
});

stream.end(req.file.buffer);

console.log(`GS://${fileName} uploaded to ${bucketName}.`);

// This will upload the file but it won't be publicly available
// To make a file public
await storage
  .bucket(bucketName)
  .file(filename)
  .makePublic();

console.log(`gs://${bucketName}/${filename} is now public.`);
 */