var express = require("express");
var darkSkyAPI = require("dark-sky-api")
var axios = require("axios");
var app = express()

var key = "e97662a26a5c00c51530832396087e62";
var param = "51.0659,-114.0914"
var darkSkyURL = "https://api.darksky.net/forecast/" + key + "/" + param;


app.get('/', function(request, response) {
	// response.sendFile(__dirname + "/" + "index.html");
	axios({
		method: "GET",
		url: darkSkyURL
	}).then(function(res) {
        	// console.log(res);
        	var cache = [];
        	var str = JSON.stringify(res, function(key, value) {
		        		if (typeof value === 'object' && value !== null) {
		        			if (cache.indexOf(value) !== -1) {
		            			// Circular reference found, discard key
		           				return;
		        			}
		        			// Store value in our collection
		        			cache.push(value);
		    			}
		    			return value;
		    		});
        	response.writeHead(200, {'Content-Type' : 'text/html'});
        	response.end(str);
        }).catch(function(err) {
        	console.log("ERROR:" + err);
        	// console.log(new Error().stack);

        });

    });

var server = app.listen(8888, function(){
	var port = server.address().port;
	console.log("App listening at http://localhost:%s\n", port);


        // axios({
        // 	method: "GET",
        // 	url: darkSkyURL
        // }).then(function(res) {
        // 	console.log(res);
        // 	// response.writeHead(200, {'Content-Type' : 'text/html'});
        // 	// response.end(res);
        // }).catch(function(err) {
        // 	console.log("ERROR:" + err);
        // })
        
    });

