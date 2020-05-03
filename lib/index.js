const fetch = require('node-fetch');
const fs = require('fs');

const URLS_MAPS = [
  "https://maps.googleapis.com/maps/api/staticmap?center=45%2C10&zoom=7&size=400x400&key=API_KEY_HERE",
  "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&fov=90&heading=235&pitch=10&key=API_KEY_HERE",
  "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJyX7muQw8tokR2Vf5WBBk1iQ&key=API_KEY_HERE",
  "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=API_KEY_HERE",
  "https://maps.googleapis.com/maps/api/geocode/json?latlng=40,30&key=API_KEY_HERE",
  "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=API_KEY_HERE",
  "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=API_KEY_HERE",
  "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Bingh&types=%28cities%29&key=API_KEY_HERE",
  "https://maps.googleapis.com/maps/api/elevation/json?locations=39.7391536,-104.9847034&key=API_KEY_HERE",
  "https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key=API_KEY_HERE",
  "https://roads.googleapis.com/v1/nearestRoads?points=60.170880,24.942795|60.170879,24.942796|60.170877,24.942796&key=API_KEY_HERE"
];

function fetchGoogleMaps(urls, keys, id_key = 0, id_url = 0, results = [], finalresults = []) {
    
          console.log("I AM HERE -1");
  if(typeof urls[id_url] !== "undefined" && typeof keys[id_key] !== "undefined" ) {
          console.log("I AM HERE0");
      var url = urls[id_url].replace("API_KEY_HERE", keys[id_key]);
      let urlParsed = new URL(url);
        
      return fetch(url, {
        method: "GET",
        headers: {
          "Host": urlParsed.host,
          "Referer": "www.example.com/path",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0",
          "Accept": "*/*"
        }})
      
      .then(response =>  response.text().then(text => {
        if(response.status === 200 && !text.includes("REQUEST_DENIED") && !text.includes("PERMISSION_DENIED")) {
          results.push(url);
        }
        
        if(typeof urls[id_url + 1] !== "undefined") {
          return fetchGoogleMaps(urls, keys, id_key, id_url + 1, results, finalresults);
        }
        else { 
          var obj = { "key": keys[id_key], "vulnerable_endpoints": results };
          finalresults.push(obj);
          
          if(typeof keys[id_key + 1] !== "undefined" ) {
            results = [];
            return fetchGoogleMaps(urls, keys, id_key + 1, 0, results, finalresults);
          }
          else {
            // end
            return finalresults;
          }
        }
        
      }))
      .catch(error => {
        console.error(error);
        return fetchGoogleMaps(urls, keys, id_key, id_url + 1, results, finalresults);
      });
  }
  
  else {
    // end
    if(typeof urls[id_url] === "undefined") {
      return Promise.reject("googleapikeyfinder: id_url ("+id_url+") is not a valid index (nb elements = "+urls.length+")");
    }
    else if(typeof keys[id_key] === "undefined") {
      return Promise.reject("googleapikeyfinder: id_key ("+id_key+") is not a valid index (nb elements = "+keys.length+")");
    }
  }
  
} 

function fromString(input) {
  
  const regexp = new RegExp("googleapis\.com/.*key=([^&\"]*)",'g');
  const ret = input.matchAll(regexp);
  
  var keys  = [];
  for(const match of ret) {
    keys.push(match[1]);
  }
  
  if(keys.length > 0) {
    return fetchGoogleMaps(URLS_MAPS, keys).then(function(results) {
      return JSON.stringify(results);
    });
  }
  else {
    return Promise.reject("googleapikeyfinder: fromString no keys");
  }
} 

function fromApiKey(apikey) {
  
  return fetchGoogleMaps(URLS_MAPS, [apikey]).then(function(results) {
    return JSON.stringify(results);
  });
} 

module.exports.fromString = fromString;
module.exports.fromApiKey = fromApiKey;



