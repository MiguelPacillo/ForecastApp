let apiKey = "uo2MGFBbCEhdFr6XBxNld7JW67byWPGO";
let searchTerm = "Miami";
let metric = "false";
let assignList = {dayOne: [], dayTwo: [], dayThree: [], dayFour: [], dayFive: []};

window.onload = function search() { // Uses accuweather search API to get the location key
    fetch("http://dataservice.accuweather.com/locations/v1/search?apikey=" + apiKey + "&q=" + searchTerm + "&language=en-us&details=false&offset=0")
        .then(res => res.json())
        .then(data => {
            let searchKey = data[0].Key; // This returns the location key for the first location in the list
            assignForcast(searchKey);
        })
}

function assignForcast(searchKey) { // Uses the location key to find the forecast for that location
    fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + searchKey + "?apikey=" + apiKey + "&language=en-us&details=true&metric=" + metric)
        .then(res => res.json())
        .then(data => {
            console.log(data.DailyForecasts);
        })
}

class Forecast {
    constructor(airQuality, dayWeather, dayPrecipitation, dayRain, daySnow, dayThunder, dayWindSpeed, dayWindDirection, nightWeather, nightPrecipitation, 
                nightRain, nightSnow, nightThunder, nightWindSpeed, nightWindDirection, moonPhase, tempMax, tempMin, realFeelMax, realFeelMin) {
    }
}
