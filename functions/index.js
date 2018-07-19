'use strict';

const fs = require('fs');
var cities = fs.readFileSync('cityInfo.json');
  cities = JSON.parse(cities);
// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

app.intent('city name', (conv, {city}) => {

   for(var i=0;i<cities.length;i++){
     if(cities[i].city === city)
     conv.close(cities[i]);
   }
  // conv.close('We\'ll show you details about ' + city +  ' soon.');

  // Complete your fulfillment logic and
  // send a response when the function is done executing
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
