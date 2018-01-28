
const server = require("./server.js");

$(document).ready(function() {
	const data = server.getWeatherJSON();
	var hour0 = (new Date(data[0].time * 1000)).getHours();
    var hour1 = (new Date(data[1].time * 1000)).getHours();
    var hour2 = (new Date(data[2].time * 1000)).getHours();

    var minute0 = (new Date(data[0].time * 1000)).getMinutes();
    var minute1 = (new Date(data[1].time * 1000)).getMinutes();
    var minute2 = (new Date(data[2].time * 1000)).getMinutes();

    $('#weatherTable').append(`
            <tr>
                <td align=\"center\">` 
                    + (hour0 == 0 ? 12 : hour0 % 12 + 1) + ":"  // HOUR in 12 hour format
                    + (minute0 < 10 ? "0" + minute0 : minute0)  // minute
                    + (hour0 < 12 ? "AM" : "PM") +              // AM/PM
                `</td>
                <td align=\"center\">` + data[0].temperature + `<sup>o</sup></td>
                <td align=\"center\">` + data[0].humidity + `</td>
            </tr>

            <tr>
                <td align=\"center\">` 
                    + (hour1 == 0 ? 12 : hour1 % 12 + 1) + ":"  // HOUR in 12 hour format
                    + (minute1 < 10 ? "0" + minute1 : minute1)  // minute
                    + (hour1 < 12 ? "AM" : "PM") +              // AM/PM
                `</td>
                <td align=\"center\">` + data[1].temperature + `<sup>o</sup></td>
                <td align=\"center\">` + data[1].humidity + `</td>
            </tr>
            <tr>
                <td align=\"center\">` 
                    + (hour2 == 0 ? 12 : hour2 % 12 + 1) + ":"  // HOUR in 12 hour format
                    + (minute2 < 10 ? "0" + minute2 : minute2)  // minute
                    + (hour2 < 12 ? "AM" : "PM") +              // AM/PM
                `</td>
                <td align=\"center\">` + data[2].temperature + `<sup>o</sup></td>
                <td align=\"center\">` + data[2].humidity + `</td>
            </tr>
    	`);
});