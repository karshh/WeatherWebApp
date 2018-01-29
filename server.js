var express = require("express");
var darkSkyAPI = require("dark-sky-api")
var axios = require("axios");
var app = express();

var PORT = 8888;

///////////////////////////////////////////////////////////////////////////////////////////////
//
//  Dark-Sky-API URL data.
//

var key = ""; // enter your key here.
var param = "51.0659,-114.0914" // co-ordinates of SAIT.
var units = "si"; // celcius

var data = null; // null for now, whenever we make a GET call to Dark Sky API, 
                 // we fill this variable with weather data.

var darkSkyURL = "https://api.darksky.net/forecast/" + key + "/" + param + "?units=" + units;

///////////////////////////////////////////////////////////////////////////////////////////////
//
//  Load CSS/JS files onto server.
//

app.use('/jquery.js', express.static(__dirname + "/" + '/jquery.js'));
app.use('/client.js', express.static(__dirname + "/" + '/client.js'));


///////////////////////////////////////////////////////////////////////////////////////////////
//
//  This code is executed when we access the home page of the host.
//

app.get('/', (request, response) => {
    axios({
        method: "GET",
        url: darkSkyURL
    }).then(function(res) {
        data = res.data.hourly.data.slice(0,3);
        response.sendFile(__dirname + "/" + "index.html");
    }).catch(function(err) {
        console.log("ERROR:" + err);
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end(err);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////
//
//  Whenever we load the page, client.js will post request weather data once the 
//  html doc has been fully loaded. The code here responds to that request, with the
//  value we stored in data earlier.
//  

app.post('/weatherData', (req, res) => res.send(data));


///////////////////////////////////////////////////////////////////////////////////////////////
//
//  Begin listening on PORT.
//

var Server = app.listen(PORT, 
    () => console.log("App listening at http://localhost:%s\n", Server.address().port));


///////////////////////////////////////////////////////////////////////////////////////////////
