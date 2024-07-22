class WeatherApp { 
 constructor(apiKey) { 
 this.apiKey = apiKey; 
 this.cache = {}; 
 } 
 async fetchWeather(city) { 
 const cacheKey = city.toLowerCase(); 
 const cachedData = this.cache[cacheKey]; 
 if (cachedData && (Date.now() - cachedData.timestamp < 10 * 60 * 1000)) {  this.displayWeather(cachedData.data); 
 return; 
 } 
 const response = await fetch(`https://api.openweathermap.org/data/2.5/weather? q=${city}&appid=${this.apiKey}`); 
 if (!response.ok) { 
 this.displayError('City not found'); 
 return; 
 } 
 const data = await response.json(); 

 this.cache[cacheKey] = { data, timestamp: Date.now() }; 
 this.displayWeather(data); 
 } 
 displayWeather(data) { 
 const container = document.getElementById('weather-container'); 
 container.innerHTML = ` 
 <h2>${data.name}</h2> 
 <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p> 
 <p>Weather: ${data.weather[0].description}</p> 
 `; 
 } 
 displayError(message) { 
 const container = document.getElementById('weather-container'); 
 container.innerHTML = `<p>Error: ${message}</p>`; 
 } 
} 
const app = new WeatherApp('YOUR_API_KEY'); 
document.getElementById('fetch-weather-button').onclick = () => { 
 const city = document.getElementById('city-input').value; 
 app.fetchWeather(city); 
}; 
// HTML 
// <input type="text" id="city-input" placeholder="Enter city"> 
// <button id="fetch-weather-button">Fetch Weather</button> 
// <div id="weather-container"></div> 
