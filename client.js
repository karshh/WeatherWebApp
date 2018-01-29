///////////////////////////////////////////////////////////////////////////////////////////////
//
//  Fills each table row with temperature data.
//

function writeTable(data) {
	$.each(data, (i, val) => {
		var date = new Date(val.time * 1000)
		var hour = date.getHours();
		hour = (hour == 0 ? 12 : hour % 12 + 1); // formatting hour to 12-hour clock.
		var min = date.getMinutes();
		min = (min < 10 ? "0" + min : min); 	// formatting minutes.
		var meridiem = (hour < 12 ? "AM" : "PM");

		$('#weatherTable').append(`
            <tr>
                <td>` + hour + ":" + min + " " + meridiem + `</td>
                <td>` + val.temperature + `<sup>o</sup></td>
                <td>` + val.humidity + `</td>
            </tr>
    	`);
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////
//
//  Upon every page load, get weather data.
//

$(document).ready(function() {

	$.ajax({
		type: 'POST',
		url: 'http://localhost:8888/weatherData',
		success: (dat) => writeTable(dat)
	});
	
});
