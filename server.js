var express = require("express");
var darkSkyAPI = require("dark-sky-api")
var axios = require("axios");

var app = express()

var key = ""; // enter your key here.
var param = "51.0659,-114.0914" // co-ordinates of SAIT.
var units = "si"; // celcius
var darkSkyURL = "https://api.darksky.net/forecast/" + key + "/" + param + "?units=" + units;


var server = app.listen(8888, function(){
    var port = server.address().port;
    console.log("App listening at http://localhost:%s\n", port);


        // axios({
        //  method: "GET",
        //  url: darkSkyURL
        // }).then(function(res) {
        //  console.log(res);
        //  // response.writeHead(200, {'Content-Type' : 'text/html'});
        //  // response.end(res);
        // }).catch(function(err) {
        //  console.log("ERROR:" + err);
        // })
        
    });

app.get('/', function(request, response) {
	// response.sendFile(__dirname + "/" + "index.html");
	axios({
		method: "GET",
		url: darkSkyURL
	}).then(function(res) {
        	// console.log(res);
        	// var cache = [];
        	// var str = JSON.stringify(res, function(key, value) {
    	    //     		if (typeof value === 'object' && value !== null) {
    	    //     			if (cache.indexOf(value) !== -1) {
    	    //         			// Circular reference found, discard key
    	    //        				return;
    	    //     			}
    	    //     			// Store value in our collection
    	    //     			cache.push(value);
    	    // 			}
    	    // 			return value;
    	    // 		});

            // var jsonContent = JSON.parse(res);

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
                                <th>Time</th>
                                <th>Temperature</th>
                                <th>Humidity</th>
                            </tr>

                            <tr>
                                <td>` + hour0 + ":" + minute0  + `</td>
                                <td>` + data[0].temperature + `<sup>o</sup></td>
                                <td>` + data[0].humidity + `</td>
                            </tr>

                            <tr>
                                <td>` + hour1 + ":" + minute1  + `</td>
                                <td>` + data[1].temperature + `<sup>o</sup></td>
                                <td>` + data[1].humidity + `</td>
                            </tr>
                            <tr>
                                <td>` + hour2 + ":" + minute2  + `</td>
                                <td>` + data[2].temperature + `<sup>o</sup></td>
                                <td>` + data[2].humidity + `</td>
                            </tr>
                            </table>
                        </body>
                    </html>
                
            `;
            // console.log(res);
            // console.log(res.data.hourly.data[0]);
            // console.log(res.data.hourly.data[1]);
            // console.log(res.data.hourly.data[2]);
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.end(htmlString);


        }).catch(function(err) {
        	console.log("ERROR:" + err);
        	// console.log(new Error().stack);

        });

    });



