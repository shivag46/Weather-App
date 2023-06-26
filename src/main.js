key =  "3781117b77f642bbab772214232606"

async function func(){
    let response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=" + key + "&q=London")
    let data = await response.json();
    console.log(data.forecast.forecastday)
}

/*
local time
max_temp
min_temp
max_windspeed
min_windspeed
sunrise
sunset
humidity
precipitation

        <h1>Latitude: 51.52</h1>
        <h1>Longitude: -0.11</h1>
        <h1>Local Time: 2023-06-26 08:15</h1>
*/

func()
