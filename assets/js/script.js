// set up variables:
var searchBtn = $("#search-btn");
var clearBtn = $("clear-btn");
var searchResult = $("#search-history");
var todayWeather = $("#today-weather");
var forecastWeather = $("#forecast-weather");
var cityInputName = $("#city-input");

// current day variable
currentDay = moment().format("MM[/]DD[/]YYYY");
console.log(currentDay);
// variable for API keys
var apiKey = "818c59d7f810b3a544e5b96a076c8332";



//search button click event
searchBtn.on("click", function(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value of the input city name
    var cityName = cityInputName.val().trim();
    

    // make sure user input a city name, cannot be empty
    if (cityName) {
        getWeatherData(cityName);

        //clear old content
        cityInputName.value = "";

        
    } else {
        alert("Invalid! Please enter a city.");
    }
});

// get weather data from city name passed in from click event:
var getWeatherData = function (city) {

    // format the openweathermap api url for current weather:
    currentUrl = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    console.log(currentUrl);
    // format the openweathermap api url for 5-day forcast weather
    forecastUrl = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";
    console.log(forecastUrl);

    // clear old data
    todayWeather.empty();
    forecastWeather.empty();

    //make a get request to url
    fetch(currentUrl).then(function(response) {
            response.json().then(function(data){
                displayCurrentWeather (data, city);
                console.log(data);
            });
        });
};

var displayCurrentWeather = function(data, city) {
    console.log(data);
    console.log(city);
}