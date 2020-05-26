const fetch = require('node-fetch');
const fs = require('fs');



const URLS_MAPS = [
  ["https://www.google.com/maps/embed/v1/place?key=API_KEY_HERE&q=Space+Needle,Seattle+WA","Google Maps Static API"],
  ["https://maps.googleapis.com/maps/api/js?key=API_KEY_HERE&callback=initMap","Google Maps Static API"],
  ["https://maps.googleapis.com/maps/api/js?key=API_KEY_HERE&libraries=places","Google Maps Static API"],
  ["https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=API_KEY_HERE","Google Maps Static API"],
  ["https://maps.googleapis.com/maps/api/streetview?size=400x400&location=47.5763831,-122.4211769&fov=80&heading=70&pitch=0&key=API_KEY_HERE","Google Maps Static API"],
  ["https://speech.googleapis.com/v1/projects/*/locations/*/operations/*?key=API_KEY_HERE","Google Cloud Speech API"],
  ["https://vision.googleapis.com/v1/locations/*/operations/*?key=API_KEY_HERE","Cloud Vision API"],
  ["https://cloudbilling.googleapis.com/v1/services?pageSize=1&pageToken=1&key=API_KEY_HERE","Cloud Billing Catalog API"],
  ["https://dlp.googleapis.com/v2/infoTypes?key=API_KEY_HERE","Cloud Data Loss Prevention API"]
];

function fetchGoogleMaps(urls, keys, id_key = 0, id_url = 0, results = [], finalresults = []) {
    
  if(typeof urls[id_url] !== "undefined" && typeof keys[id_key] !== "undefined" ) {
      var url = urls[id_url][0].replace("API_KEY_HERE", keys[id_key]);
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



