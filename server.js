var express = require("express");
var darkSkyAPI = require("dark-sky-api")
var axios = require("axios");

var app = express()

var key = "b5b214e1b2f0325b956141fef771d3de"; // enter your key here.
var param = "51.0659,-114.0914" // co-ordinates of SAIT.
var units = "si"; // celcius
var darkSkyURL = "https://api.darksky.net/forecast/" + key + "/" + param + "?units=" + units;


var server = app.listen(8888, function(){
    var port = server.address().port;
    console.log("App listening at http://localhost:%s\n", port);
    });

app.get('/', function(request, response) {
	axios({
		method: "GET",
		url: darkSkyURL
	}).then(function(res) {

            var data = res.data.hourly.data;
            var hour0 = (new Date(data[0].time * 1000)).getHours();
            var hour1 = (new Date(data[1].time * 1000)).getHours();
            var hour2 = (new Date(data[2].time * 1000)).getHours();

            var minute0 = (new Date(data[0].time * 1000)).getMinutes();
            var minute1 = (new Date(data[1].time * 1000)).getMinutes();
            var minute2 = (new Date(data[2].time * 1000)).getMinutes();

            var htmlString = 
                `<!DOCTYPE html>
                    <html>
                        <body>
                            <table id=\"weatherTable\">
                            <tr>
                                <th align=\"center\">Time</th>
                                <th align=\"center\">Temperature</th>
                                <th align=\"center\">Humidity</th>
                            </tr>

                            <tr>
                                <td align=\"center\">` 
                                    + (hour0 == 0 ? 12 : hour0 % 12 + 1) + ":"  // HOUR in 12 hour format
                                    + (minute0 < 10 ? "0" + minute0 : minute0)  // minute
                                    + " " + (hour0 < 12 ? "AM" : "PM") +              // AM/PM
                                `</td>
                                <td align=\"center\">` + data[0].temperature + `<sup>o</sup></td>
                                <td align=\"center\">` + data[0].humidity + `</td>
                            </tr>

                            <tr>
                                <td align=\"center\">` 
                                    + (hour1 == 0 ? 12 : hour1 % 12 + 1) + ":"  // HOUR in 12 hour format
                                    + (minute1 < 10 ? "0" + minute1 : minute1)  // minute
                                    + " " + (hour1 < 12 ? "AM" : "PM") +              // AM/PM
                                `</td>
                                <td align=\"center\">` + data[1].temperature + `<sup>o</sup></td>
                                <td align=\"center\">` + data[1].humidity + `</td>
                            </tr>
                            <tr>
                                <td align=\"center\">` 
                                    + (hour2 == 0 ? 12 : hour2 % 12 + 1) + ":"  // HOUR in 12 hour format
                                    + (minute2 < 10 ? "0" + minute2 : minute2)  // minute
                                    + " " + (hour2 < 12 ? "AM" : "PM") +              // AM/PM
                                `</td>
                                <td align=\"center\">` + data[2].temperature + `<sup>o</sup></td>
                                <td align=\"center\">` + data[2].humidity + `</td>
                            </tr>
                            </table>
                        </body>
                    </html>
                
            `;
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.end(htmlString);


        }).catch(function(err) {
        	console.log("ERROR:" + err);

        });

    });



