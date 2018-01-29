# Weather Web App
### Introduction

This project demonstrates Node.js (Express) effectively to interact with a weather API and the  client to display the hourly weather in Calgary (SAIT co-oordinate). 

### Get it running

This setup assumes you have an understanding of npm.

Download [the zip file](https://github.com/karshh/WeatherWebApp/archive/master.zip) and unzip it in your local machine. Alternatively, you can execute the following on a terminal if you have git installed.
```sh
$ git clone https://github.com/karshh/WeatherWebApp.git
```

Go to [DarkSky's page](https://darksky.net/dev) and login (or create an account if you haven't yet). Darksky's console will have your secret key at the top.
Copy this key, open server.js, and scroll to the following line.

```js
var key = ""; // enter your key here.
```

Paste your key in the quotes, save the file, and execute the following.
```sh
$ node server.js
```
A command line output will state the URL which the server is listening on. Go on chrome and open up this URL. 
