const lib = require('./lib/index.js');

function printCmdUsage() {
    console.error("---------\ngoogleapikeyfinder\n---------\n");
    console.error("command: node googleapikeyfinder.js API_KEY\n\t");
}
  
if(process.argv.length > 2) {
  lib.fromApiKey(process.argv[2]).then(function(results) {
    console.dir(results);
  })
  .catch(error => {
    console.error(error);
  });
}
else {
  printCmdUsage();
}


/* https://developers.google.com/maps/apis-by-platform#web_service_apis
 * 
 *  to protect with IP address restrictions only
 *
 * otherwise:
 * 
 * {
   "error_message" : "API keys with referer restrictions cannot be used with this API.",
   "results" : [],
   "status" : "REQUEST_DENIED"
}

https://developers.google.com/maps/faq?hl=fr
Important: If you are using any of the web service APIs with an API key that has referer restrictions, your requests will fail with the error message: "API keys cannot have referer restrictions when used with this API." You should switch to using an API key with IP address restrictions.

to study:
https://console.cloud.google.com/google/maps-apis/api-list?project=blissful-answer-270918
*/
