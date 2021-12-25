// showing current day of the week 
let dayElement = document.querySelector("#day");
let currentDay = new Date();
let day = currentDay.getDay(); 
let days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
dayElement.innerHTML = `${days[day]}`;
// showing current time + added ) in front of minutes
let timeElement = document.querySelector("#time");
let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
timeElement.innerHTML = `${hours}:${minutes}`;

// displaying a name of the city after a user submts the form
// funtion for the weather condition that we mention in the function below
function displayWeatherCondition(response){
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currenttemprature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#feelstemprature").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#currentweather").innerHTML = response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  document.querySelector("#sunset").innerHTML = response.data.sys.sunset;

  let iconElement = document.querySelector("#bigicon");

  celciusTemperature = response.data.main.temp;
  celciusfeelslikeTemperature = Math.round(response.data.main.feels_like);

iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
}

// function for the onload search for Berlin
function searchCity(city) {
  let apiKey = "4e13aa90127904d13b6a4af59475dbf3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  // let cityElement = document.querySelector("#city");
  // let cityInput = document.querySelector("#city-input");
  // cityElement.innerHTML = cityInput.value;
  // make an API call to OpenWeather API
  // once I get the HTTP response, the city name and the temperature are displayed
  let city = document.querySelector("#city-input").value;
  // moving all below to the fuction above to have the onload search for Berlin
  // let apiKey = "4e13aa90127904d13b6a4af59475dbf3";
  // let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // axios.get(apiUrl).then(displayWeatherCondition);
  // calling for the search city function so search for other cities will work 
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
// API for current location
function searchLocation(position) {
  let apiKey = "4e13aa90127904d13b6a4af59475dbf3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
// funtion for button current submit 
function getCurrentLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
// changing C to F on a clik (with fake data)
function convertToFahrenheit(event)
{
  event.preventDefault();
  let temperatureSymbolElement = document.querySelector("#temperaturesymbol");
    if (temperatureSymbolElement.innerHTML !== "°F"){
    let temperatureElement = document.querySelector("#currenttemprature");
    let currenttemprature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);}
  // feels like
  let temperaturefeelslikeElement = document.querySelector("#feelstemprature");
  if (temperatureSymbolElement.innerHTML !== "°F") {
  let feelstemprature = temperaturefeelslikeElement.innerHTML;
  temperaturefeelslikeElement.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);}
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

// C - F
function convertToFahrenheitSymbol(event)
{
  event.preventDefault();
  let temperatureSymbolElement = document.querySelector("#temperaturesymbol");
  let temperaturesymbol = temperatureSymbolElement.innerHTML;
  temperatureSymbolElement.innerHTML = "°F";
// feels like
  let temperaturefeelslikeSymbolElement = document.querySelector("#feelstempraturesymbol");
  let feelstempraturesymbol = temperaturefeelslikeSymbolElement.innerHTML;
  temperaturefeelslikeSymbolElement.innerHTML = "°F";
}
let fahrenheitsymbol = document.querySelector("#fahrenheit");
fahrenheitsymbol.addEventListener("click", convertToFahrenheitSymbol);

// changing F to C on a clik 
function convertToCelcius(event)
{
  event.preventDefault();
  let temperatureSymbolElement = document.querySelector("#temperaturesymbol");
    if (temperatureSymbolElement.innerHTML !== "°C") {
  let temperatureElement = document.querySelector("#currenttemprature");
  let currenttemprature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(celciusTemperature);}
  // feels like 
  let temperaturefeelslikeElement = document.querySelector("#feelstemprature");
    if (temperatureSymbolElement.innerHTML !== "°C") {
  let feelstemprature = temperaturefeelslikeElement.innerHTML;
  temperaturefeelslikeElement.innerHTML = celciusfeelslikeTemperature;}
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertToCelcius);

// F - C
function convertToCelciusSymbol(event)
{
  event.preventDefault();
  let temperatureSymbolElement = document.querySelector("#temperaturesymbol");
  let temperaturesymbol = temperatureSymbolElement.innerHTML;
  temperatureSymbolElement.innerHTML = "°C";
// feels like
  let temperaturefeelslikeSymbolElement = document.querySelector("#feelstempraturesymbol");
  let feelstempraturesymbol = temperaturefeelslikeSymbolElement.innerHTML;
  temperaturefeelslikeSymbolElement.innerHTML = "°C";
}
let celciussymbol = document.querySelector("#celcius");
celciussymbol.addEventListener("click", convertToCelciusSymbol);
// adding current location button 
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// making the button change the tempatyre only once when clicked 
let celciusTemperature = null; 
let celciusfeelslikeTemperature = null ;
let fahrenheitTemperature = null;

// calling a city on load 
searchCity("Berlin");