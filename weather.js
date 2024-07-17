const apiKey = "f47bc1099e7c56f56bb4d4f0dc4eba68"; // Replace with your OpenWeatherMap API key

// Fetch weather data based on the city name entered by the user
function getWeatherData() {
  const city = document.getElementById("city-input").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => updateUI(data))
    .catch(error => alert(error.message));
}

// Update UI with current weather data
function updateUI(data) {
  const city = data.name;
  const weather = data.weather[0].main;
  const iconCode = data.weather[0].icon;
  const temp = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const pressure = data.main.pressure;

  document.getElementById("location").textContent = city;
  document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.getElementById("temperature").textContent = `${temp}°C`;
  document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
  document.getElementById("wind").textContent = `Wind: ${windSpeed} m/s`;
  document.getElementById("pressure").textContent = `Pressure: ${pressure} hPa`;

  getForecastData(data.coord.lat, data.coord.lon);
}

// Fetch 5-day weather forecast data based on latitude and longitude
function getForecastData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => updateForecast(data))
    .catch(error => console.error('Error fetching forecast data:', error));
}

// Update UI with 5-day weather forecast data
function updateForecast(data) {
  const forecastList = document.getElementById("forecast-list");
  forecastList.innerHTML = ""; // Clear existing forecast

  for (let i = 1; i <= 5; i++) { // Get next 5 days forecast
    const dayData = data.daily[i];
    const date = new Date(dayData.dt * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: 'short' }); // Get weekday (e.g., Mon)
    const highTemp = Math.round(dayData.temp.max);
    const lowTemp = Math.round(dayData.temp.min);
    const weatherIcon = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`; // Get weather icon for forecast day

    // Create a new list item for each forecast day
    const forecastItem = document.createElement("li");
    forecastItem.innerHTML = `
      <span class="day">${day}</span>
      <img class="weather-icon" src="${weatherIcon}" alt="Weather Icon">
      <span class="temp">H: ${highTemp}°C L: ${lowTemp}°C</span>
    `;
    forecastList.appendChild(forecastItem);
  }
}
function updateForecast(data) {
  const forecastList = document.getElementById("forecast-list");
  forecastList.innerHTML = ""; // Clear existing forecast

  for (let i = 0; i < 5; i++) { // Get next 5 days forecast
    const dayData = data.daily[i];
    const date = new Date(dayData.dt * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: 'short' }); // Get weekday (e.g., Mon)
    const highTemp = Math.round(dayData.temp.max);
    const lowTemp = Math.round(dayData.temp.min);
    const weatherIcon = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`; // Get weather icon for forecast day

    // Create a new list item for each forecast day
    const forecastItem = document.createElement("li");
    forecastItem.innerHTML = `
      <span class="day">${day}</span>
      <img class="weather-icon" src="${weatherIcon}" alt="Weather Icon">
      <span class="temp">H: ${highTemp}°C L: ${lowTemp}°C</span>
    `;
    forecastList.appendChild(forecastItem);
  }
}