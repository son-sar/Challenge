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

//[START gae_node_request_example]
const fs = require('fs/promises');

const csv = require('csv-parser')

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname+"/index.html");
});

// Start the server
const PORT = parseInt(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

// get user input
app.get("/getphone", function (req, res){
  var phone = req.query.phone;

  if (phone != "") {
      res.send("Your Your search entry is " + phone);
  } else {
      res.send("Please provide the phone model");
  }
  res.end();
});

// [END gae_node_request_example]

// Rainforest Amazon API
const axios = require('axios');

// set up the request parameters
const params = {
api_key: "7CD73A917AB54D2E9E071865C03A4C46",
  type: "search",
  amazon_domain: "amazon.de",
  search_term: "i Phone",
  sort_by: "price_low_to_high",
  currency: "eur",
  output: "csv"
}

// get search term from keyword input 

// make the http GET request to Rainforest API
axios.get('https://api.rainforestapi.com/request', { params })
.then(response => {

    // print the CSV response from Rainforest API
    console.log(response.data);
    const csv_response = response.data;

    async function example() {
      try {
        const content = csv_response;
        await fs.writeFile('/Users/so/gitp/Challenge/websearch_node/phone_prices.csv', content);
      } catch (err) {
        console.log(err);
      }
    }
    example();

  }).catch(error => {
// catch and print the error
console.log(error);
})




// API END 

module.exports = app;
