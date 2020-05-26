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
