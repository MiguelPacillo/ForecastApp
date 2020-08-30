let apiKey = "uo2MGFBbCEhdFr6XBxNld7JW67byWPGO";
let searchTerm = "Miami";
let metric = "false";
let unitTemp = "°F";
let unitSpeed = "mph";
let days = ["One", "Two", "Three", "Four", "Five"];

function search() { // Uses accuweather search API to get the location key

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
                    forecastList[i].Day.PrecipitationProbability + "%", // Day precip. probability
                    forecastList[i].Day.RainProbability + "%", // Day rain probability
                    forecastList[i].Day.SnowProbability + "%", // Day snow probability
                    forecastList[i].Day.ThunderstormProbability + "%", // Day tstorm probability
                    forecastList[i].Day.Wind.Speed.Value + " " + unitSpeed, // Day wind speed
                    forecastList[i].Day.Wind.Direction.Degrees + "°", // Day wind direction
                    forecastList[i].Day.Icon, // Day weather icon ID
                    forecastList[i].Night.IconPhrase, // Night weather
                    forecastList[i].Night.PrecipitationProbability + "%", // Night precip. probability
                    forecastList[i].Night.RainProbability + "%", // Night rain probability
                    forecastList[i].Night.SnowProbability + "%", // Night snow probability
                    forecastList[i].Night.ThunderstormProbability + "%", // Night tstorm probability
                    forecastList[i].Night.Wind.Speed.Value + " " + unitSpeed, // Night wind speed
                    forecastList[i].Night.Wind.Direction.Degrees + "°", // Night wind direction
                    forecastList[i].Night.Icon, // Night weather icon
                    forecastList[i].Moon.Phase, // Moon phase
                    forecastList[i].Temperature.Maximum.Value + unitTemp, // Max temp
                    forecastList[i].Temperature.Minimum.Value + unitTemp, // Min temp
                    forecastList[i].RealFeelTemperature.Maximum.Value + unitTemp, // Max real feel temp
                    forecastList[i].RealFeelTemperature.Minimum.Value + unitTemp, // Min real feel temp
                    days[i] // Day number
                    ))
        }

        console.log(assignList);
        
        for (let i = 0; i < assignList.length; i++) { // Calls display method for every day in the list
            assignList[i].displayValues();
        }
    })
}

function unitChangerFunction() { // Changes units on button click
    if (!metric) {
        metric = true;
        unitTemp = "°C";
        unitSpeed = "km/h";
        document.getElementById("unitChanger").innerHTML = "Metric";
    } else {
        metric = false;
        unitTemp = "°F";
        unitSpeed = "mph";
        document.getElementById("unitChanger").innerHTML = "Imperial";
    }
}


class Forecast {
    constructor(airQuality, dayWeather, dayPrecipitation, dayRain, daySnow, dayThunder, dayWindSpeed, dayWindDirection, dayIcon, nightWeather, nightPrecipitation, 
                nightRain, nightSnow, nightThunder, nightWindSpeed, nightWindDirection, nightIcon, moonPhase, tempMax, tempMin, realFeelMax, realFeelMin, dayNumber) {
        
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

                    this.dayNumber = dayNumber;

    }

    displayValues() {

        document.getElementById("maxTemp" + this.dayNumber).innerHTML = this.tempMax; // Displays max temp value
        document.getElementById("minTemp" + this.dayNumber).innerHTML = this.tempMin; // Displays min temp value
        
        // Display day statistics

        document.getElementById("weatherIconDay" + this.dayNumber).src = "icons/" + this.dayIcon + ".png"; // Displays day icon
        document.getElementById("weatherPhraseDay" + this.dayNumber).innerHTML = this.dayWeather; // Displays day weather
        document.getElementById("preciProbabilityDay" + this.dayNumber).innerHTML = this.dayPrecipitation; // Displays day precipitation probability
        document.getElementById("windSpeedDay" + this.dayNumber).innerHTML = this.dayWindSpeed; // Displays day wind speed
        document.getElementById("windDirectionDay" + this.dayNumber).innerHTML = this.dayWindDirection; // Displays day wind direction

        // Display night statistics

        document.getElementById("weatherIconNight" + this.dayNumber).src = "icons/" + this.nightIcon + ".png"; // Displays night icon
        document.getElementById("weatherPhraseNight" + this.dayNumber).innerHTML = this.nightWeather; // Displays night weather
        document.getElementById("preciProbabilityNight" + this.dayNumber).innerHTML = this.nightPrecipitation; // Displays night precipitation probability
        document.getElementById("windSpeedNight" + this.dayNumber).innerHTML = this.nightWindSpeed; // Displays night wind speed
        document.getElementById("windDirectionNight" + this.dayNumber).innerHTML = this.nightWindDirection; // Displays night wind direction
    }
    
}
