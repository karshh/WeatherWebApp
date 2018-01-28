var express = require("express");
var darkSkyAPI = require("dark-sky-api")
var axios = require("axios");
var app = express()

var PORT = 8888
var key = ""; // enter your key here.
var param = "51.0659,-114.0914" // co-ordinates of SAIT.
var units = "si"; // celcius
var darkSkyURL = "https://api.darksky.net/forecast/" + key + "/" + param + "?units=" + units;

var index = "index.html";

function getWeatherJSON() {
    axios({
        method: "GET",
        url: darkSkyURL
    }).then(function(res){
        return res.data.hourly.data;
    }).catch(function(err) {
            console.log("ERROR:" + err);
            return err;

    });
}


app.listen(PORT, function(){
    var port = this.address().port;
    console.log("App listening at http://localhost:%s\n", port);
    });


app.get('/', function(request, response) {
    response.sendFile(__dirname + "/" + index)
    });



app.use('/jquery.js', express.static(__dirname + "/" + '/jquery.js'));

app.use('/clientBrowserify.js', express.static(__dirname + "/" + '/clientBrowserify.js'));

