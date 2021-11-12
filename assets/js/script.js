// set up variables:
var searchBtn = $("#search-btn");
var clearBtn = $("clear-btn");
var searchResult = $("#search-history");
var todayWeather = $("#today-weather");
var forecastWeather = $("#forecast-weather");
var cityInputName = $("#city-input");

// current day variable
currentDay = moment().format("MM[/]DD[/]YYYY");
//console.log(currentDay);
// variable for API keys
var apiKey = "818c59d7f810b3a544e5b96a076c8332";

// track the search count for local storage
var searchCount = 0;
// for loop to persit the search data into the search history
for (var i=0; i<localStorage.length; i++) {
    var getCity = localStorage.getItem(i);
    searchResult.append("<li class='search-item mt-2 col-12'>" + getCity + "</li>");

};


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
    currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    console.log(currentUrl);
    // format the openweathermap api url for 5-day forcast weather
    forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";
    //console.log(forecastUrl);

    // clear old data
    todayWeather.empty();
    forecastWeather.empty();

    //make a get request to url
    fetch(currentUrl).then(function(response) {
            response.json().then(function(data){
                displayCurrentWeather (data);
                //console.log(data);
            });
        });
};

var displayCurrentWeather = function(data) {
    //console.log(data);
    
    //Append h2 city name with id to the main display container: 
    todayWeather.append("<h2 id='city-name'>" + data.name + " (" + currentDay + ") " + "<img src='https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'></h2>");
        // set local storage
        var searchStorage = localStorage.setItem(searchCount, data.name);
        searchCount = searchCount + 1;

}