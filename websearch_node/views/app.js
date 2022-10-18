// Copyright 2018 Google LLC
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

const express = require('express');
const path = require('path');

const app = express();

const fs = require('fs/promises');

const http = require('http');
const csv = require('csv-parser');

const ps = require("prompt-sync")
const prompt = ps();

const axios = require('axios');
const { clear } = require("console");

// [START enable_parser]
// This middleware is available in Express v4.16.0 onwards
app.use(express.urlencoded({extended: true}));
// [END enable_parser]

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

// [START add_display_form]
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, '/form.html'));
});
// [END add_display_form]

// [START add_post_handler]
app.post('/search', (req, res) => {
  console.log({
    phone_model: req.body.phone_model
  });
  let phone_model = req.body.phone_model;
  console.log("phone_model 2", phone_model);
  res.send(`Phone model entered: ${phone_model}`);

// set base_url
let base_url = "amazon.de";

let min_price = "price_low_to_high";

//let max_price = "price_high_to_low";

//let avg_price = "";

//let cmn_price = "";

// [END gae_node_request_example]

// Rainforest Amazon API

// set up the request parameters
// save as environment variable
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

// save API key as environment variable 

// get search term from keyword input 
let csv_response = {};

// make the http GET request to Rainforest API
axios.get('https://api.rainforestapi.com/request', { params })
.then(response => {

    // print the CSV response from Rainforest API
    console.log("respsonse.data:", response.data);
    csv_response = response.data;

    console.log("rd_timestamp", response.data.request_metadata.created_at);
/* 
    console.log("search_results[0]:", response.data.search_results[0]);
   /*  console.log("search_results[0].title:", response.data.search_results[0].title);
    console.log("search_results[0].prices[0].raw:", response.data.search_results[0].prices[0].raw);
    console.log("search_results[0].prices[0].value:", response.data.search_results[0].prices[0].value);
    console.log("search_results[0].price:", response.data.search_results[0].price); */
    // undefined console.log("search_results[0].prices.value:", response.data.search_results[0].prices.value);
    // console.log("search_results[0].price.raw:", response.data.search_results[0].price.raw);
    // undefined console.log("search_results.prices[0].value:", response.data.search_results.prices[0].value);

    // looking for iPhone 14 Pro 1TB */

    let max_price;

    console.log("response.data.search_results.length", response.data.search_results.length);

    max_price = response.data.search_results[response.data.search_results.length - 1].price.raw;
/* 
    let average_price;
    let sum = 0;
 
    console.log("response.data.search_results.prices[i].value", response.data.search_results.prices[].value);


    for (let i = 0; i < response.data.search_results.length; i++ ){
        sum += parseInt(response.data.search_results[i].price.raw, 10);
        console.log("sum", sum); //don't forget to add the base
    }
    
    average_price = sum/response.data.search_results.length;
  
    console.log("average price", average_price); 
*/

    console.log ("max_price", max_price);

    const myPhoneData = {
      timestamp: response.data.request_metadata.created_at,
      phone: response.data.search_results[0].title,
      min_price: response.data.search_results[0].price.raw,
      max_price: max_price
    }

    console.log("myPhoneData", myPhoneData);

    // --> add to table  

    //console.log("rd_search_results:", response.data.search_results);

    // store data in a new object and then export it to a csv file (with timestamp) and then to cloud storage 
   // https://cloud.google.com/nodejs/docs/reference/gcs-resumable-upload/latest


    // if myPhoneData.timestamp

    async function storeFile() {
      try {

// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

// Creates a GCP Storage client
const storage = new Storage({
    projectId: "adtest-365508",
});

// Declare the bucket you wanna upload the files
const bucketName = "my-phone-test-bucket";
 
        await fs.writeFile('phone_prices.json', JSON.stringify(myPhoneData));

storage
.bucket(bucketName)
.upload("phone_prices.json", { destination: '/my_phone_tables/phone_prices.json' })
.then(() => {
  console.log('success');
})
.catch((err) => {
  console.error('ERROR:', err);
});

      } catch (err) {
        console.log(err);
      }
    }
    storeFile(); 

  }).catch(error => {
// catch and print the error
console.log(error);
})

});
// [END add_post_handler]


const PORT = parseInt(process.env.PORT) || 8080;

const Server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

console.log('Server is Running');

