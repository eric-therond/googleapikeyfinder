const fetch = require('node-fetch');
const fs = require('fs');

function fetchGoogleMaps(urls_maps, id, key, results) {
    
    if(typeof urls_maps[id] !== "undefined") {
        var url = urls_maps[id].replace("API_KEY_HERE", key);
        let urlParsed = new URL(url);
        
        fetch(url, {
            method: "GET",
            headers: {
                "Host": urlParsed.host,
                "Referer": "bidon.com",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0",
                "Accept": "*/*"
            }})
        .then(res => {
            if(res.status === 200) {
                results.push(url);
            }
            
            fetchGoogleMaps(urls_maps, id + 1, key, results);
        });
    }
    else {
         // end
        //console.dir(JSON.stringify(results));
    }
} 
function fromString(input) {
    var results = [];

    const urls_maps = [
        "https://maps.googleapis.com/maps/api/js?v=3.36&amp;key=API_KEY_HERE&amp;region=FR&amp;libraries=places&amp;callback=init_locator&amp;language=fr-FR",
        "https://maps.googleapis.com/maps/api/js?v=3.36&amp;key=API_KEY_HERE&amp;region=FR&amp;libraries=places&amp;callback=init_locator&amp;language=fr-FR","https://maps.googleapis.com/maps/api/staticmap?center=45%2C10&zoom=7&size=400x400&key=API_KEY_HERE",
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
    
    const regexp = new RegExp("https://.*\.googleapis\.com/.*key=([^&]*)&",'g');
    const ret = input.matchAll(regexp);

    for(const match of ret) {
        fetchGoogleMaps(urls_maps, 0, match[1], results);
    }
    
    return JSON.stringify(results);
} 

module.exports.fromString = fromString;

