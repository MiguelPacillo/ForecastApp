let apiKey = "uo2MGFBbCEhdFr6XBxNld7JW67byWPGO";
let searchTerm = "Miami";
let metric = "false";

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
            let forecastList = data.DailyForecasts;
            let assignList = []; // Blanks list of forecast objects

            for (let i = 0; i < forecastList.length; i++) {
                assignList.push(new Forecast(
                    forecastList[i].AirAndPollen[0].Category, // Air quality
                    forecastList[i].Day.IconPhrase, // Day weather
                    forecastList[i].Day.PrecipitationProbability, // Day precip. probability
                    forecastList[i].Day.RainProbability, // Day rain probability
                    forecastList[i].Day.SnowProbability, // Day snow probability
                    forecastList[i].Day.ThunderstormProbability, // Day tstorm probability
                    forecastList[i].Day.Wind.Speed.Value, // Day wind speed
                    forecastList[i].Day.Wind.Direction.Degrees, // Day wind direction
                    forecastList[i].Day.Icon, // Day weather icon ID
                    forecastList[i].Night.IconPhrase, // Night weather
                    forecastList[i].Night.PrecipitationProbability, // Night precip. probability
                    forecastList[i].Night.RainProbability, // Night rain probability
                    forecastList[i].Night.SnowProbability, // Night snow probability
                    forecastList[i].Night.ThunderstormProbability, // Night tstorm probability
                    forecastList[i].Night.Wind.Speed.Value, // Night wind speed
                    forecastList[i].Night.Wind.Direction.Degrees, // Night wind direction
                    forecastList[i].Night.Icon, // Night weather icon
                    forecastList[i].Moon.Phase, // Moon phase
                    forecastList[i].Temperature.Maximum.Value, // Max temp
                    forecastList[i].Temperature.Minimum.Value, // Min temp
                    forecastList[i].RealFeelTemperature.Maximum.Value, // Max real feel temp
                    forecastList[i].RealFeelTemperature.Minimum.Value // Min real feel temp
                    ))
        }
        console.log(assignList);
    })

class Forecast {
    constructor(airQuality, dayWeather, dayPrecipitation, dayRain, daySnow, dayThunder, dayWindSpeed, dayWindDirection, dayIcon, nightWeather, nightPrecipitation, 
                nightRain, nightSnow, nightThunder, nightWindSpeed, nightWindDirection, nightIcon, moonPhase, tempMax, tempMin, realFeelMax, realFeelMin) {
        
                    this.airQuality = airQuality;

                    this.dayWeather = dayWeather;
                    this.dayPrecipitation = dayPrecipitation;
                    this.dayRain = dayRain;
                    this.daySnow = daySnow;
                    this.dayThunder = dayThunder;
                    this.dayWindSpeed = dayWindSpeed;
                    this.dayWindDirection = dayWindDirection;
                    this.dayIcon = dayIcon;

                    this.nightWeather = nightWeather;
                    this.nightPrecipitation = nightPrecipitation;
                    this.nightRain = nightRain;
                    this.nightSnow = nightSnow;
                    this.nightThunder = nightThunder;
                    this.nightWindSpeed = nightWindSpeed;
                    this.nightWindDirection = nightWindDirection;
                    this.nightIcon = nightIcon;

                    this.moonPhase = moonPhase;

                    this.tempMax = tempMax;
                    this.tempMin = tempMin;

                    this.realFeelMax = realFeelMax;
                    this.realFeelMin = realFeelMin;

    }
    
}}
