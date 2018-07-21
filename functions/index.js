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

   let theCity;
   for(var i=0; i<cities.length; i++) {
     if(cities[i].name.toLocaleLowerCase() === city.toLocaleLowerCase()) {
        theCity = cities[i];
        break;
     }
   }
   
   theCity ? conv.close(`<speak>${city} is in  ${theCity.state}` + `<audio src="${audioSound}"></audio></speak>`) : conv.close(`<speak>We have not mapped this city yet.<audio src="${audioSound}"></audio></speak>`);
   conv.ask(`<speak>would you want to explore more city<audio src="${audioSound}"></audio></speak>`);

  // Complete your fulfillment logic and
  // send a response when the function is done executing
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
