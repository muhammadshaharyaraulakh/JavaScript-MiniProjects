const apiKey = "";//Enter the key from Open Weather Api

document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    async function GetWeatherData() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("City not found.");
            }

            const data = await response.json();
            const icon = data.weather[0].icon;
            const description = data.weather[0].description;
document.querySelector(".weather-card").innerHTML = `
    <div class="city-name" id="display-city">${data.name}, ${data.sys.country}</div>
    <div class="date" id="display-date">${new Date().toDateString()}</div>
    <div class="main-weather-info">
        <div class="temperature" id="display-temp">${data.main.temp}°C</div>
        <div class="weather-icon-description">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon" id="weather-icon">
            <div class="description" id="display-description">${description}</div>
        </div>
    </div>
    <div class="details-grid">
        <div class="detail-item">
            <i class="fas fa-thermometer-half"></i>
            <span class="label">Feels Like</span>
            <span class="value" id="display-feels-like">${data.main.feels_like}°C</span>
        </div>
        <div class="detail-item">
            <i class="fas fa-tint"></i>
            <span class="label">Humidity</span>
            <span class="value" id="display-humidity">${data.main.humidity}%</span>
        </div>
        <div class="detail-item">
            <i class="fas fa-wind"></i>
            <span class="label">Wind Speed</span>
            <span class="value" id="display-wind-speed">${data.wind.speed} km/h</span>
        </div>
        <div class="detail-item">
            <i class="fas fa-tachometer-alt"></i>
            <span class="label">Pressure</span>
            <span class="value" id="display-pressure">${data.main.pressure} hPa</span>
        </div>
        <div class="detail-item">
            <i class="fas fa-temperature-low"></i>
            <span class="label">Min Temp</span>
            <span class="value" id="display-min-temp">${data.main.temp_min}°C</span>
        </div>
        <div class="detail-item">
            <i class="fas fa-temperature-high"></i>
            <span class="label">Max Temp</span>
            <span class="value" id="display-max-temp">${data.main.temp_max}°C</span>
        </div>
    </div>
`;

        } catch (error) {
            alert(error.message);
        }
    }

    GetWeatherData();
});