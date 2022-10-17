// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/* // ----- BUCKET CREATION

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html

// Creates a client using Application Default Credentials
const storage = new Storage();

// Creates a client from a Google service account key
// const storage = new Storage({keyFilename: 'key.json'});

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';
/* 
async function createBucket() {
  // Creates the new bucket
  await storage.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created.`);
}

createBucket().catch(console.error); 

// ----- BUCKET CREATION */


//[START gae_node_request_example]
const fs = require('fs/promises');

const http = require('http');

const csv = require('csv-parser');

const express = require('express');

const app = express();

const ps = require("prompt-sync")
const prompt = ps();

// Start the server
const PORT = parseInt(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

console.log('Server is Running');

// get user input part 2 thru shell
let phone_model = prompt("Enter your phone model:");
console.log(`You are looking for ${phone_model}`);

// set base_url
let base_url = "amazon.de";

let min_price = "price_low_to_high";

let max_price = "price_high_to_low";

let avg_price = "";

let cmn_price = "";

// [END gae_node_request_example]

// Rainforest Amazon API
const axios = require('axios');

// set up the request parameters
const params = {
api_key: "7CD73A917AB54D2E9E071865C03A4C46",
  type: "search",
  amazon_domain: base_url,
  search_term: phone_model,
  sort_by: min_price,
  currency: "eur",
  output: "json"
}

console.log("params:", params);
console.log("output2:", params.output[2]);

// better use json instead of csv

// get search term from keyword input 
let csv_response = {};

// make the http GET request to Rainforest API
axios.get('https://api.rainforestapi.com/request', { params })
.then(response => {

    // print the CSV response from Rainforest API
    console.log("respsonse.data:", response.data);
    csv_response = response.data;

    console.log("rd_search_results_pos1:", response.data.search_results[0]);
    console.log("rd_search_results_pos1_titel:", response.data.search_results[0].title);
    console.log("rd_search_results_pos1_preis:", response.data.search_results[0].price.raw);

    // --> in eine Tabelle speichern 

    //console.log("rd_search_results:", response.data.search_results);

    // store data in a new object and then export it to a csv file (with timestamp) and then to cloud storage 

/* 
    async function example() {
      try {
        const content = csv_response;
        await fs.writeFile('/Users/so/gitp/Challenge/websearch_node/phone_prices.csv', content);
      } catch (err) {
        console.log(err);
      }
    }
    example(); 
*/

// https://cloud.google.com/nodejs/docs/reference/gcs-resumable-upload/latest

  }).catch(error => {
// catch and print the error
console.log(error);
})

console.log("response data from axios: ", csv_response);

// API END 

module.exports = app;
