///////////////////////////////////////////////////////////////////////////////////////////////
//
//  Fills each table row with temperature data.
//

function writeTable(data) {
	$.each(data, (i, val) => {
		var date = new Date(val.time * 1000)
		var hour = date.getHours();
		var min = date.getMinutes();
		var meridiem = (hour < 12 ? "AM" : "PM");

		hour = (hour == 0 || hour == 12 ? 12 : hour % 12); // formatting hour to 12-hour clock.
		min = (min < 10 ? "0" + min : min); 	// formatting minutes.
		$('#weatherTable').append(`
            <tr>
                <td>` + hour + ":" + min + " " + meridiem + `</td>
                <td>` + Math.round(val.temperature) + `&deg;</td>
                <td>` + Math.round(val.humidity*100) + `&#37;</td>
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
