document.addEventListener('DOMContentLoaded', () => {
    console.log("Script Loaded!");

    // Initialize Leaflet Map
    const map = L.map('map').setView([51.505, -0.09], 13); // Default to London

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([51.505, -0.09]).addTo(map)
        .bindPopup('Default Location')
        .openPopup();

    // Weather Animation Example
    const weatherAnimation = document.getElementById("weather-animation");

    function displayWeatherAnimation(condition) {
        weatherAnimation.innerHTML = ""; // Clear existing animation

        if (condition.includes("sun")) {
            const sun = document.createElement("div");
            sun.classList.add("sun");
            weatherAnimation.appendChild(sun);
        } else if (condition.includes("cloud")) {
            const cloud = document.createElement("div");
            cloud.classList.add("cloud");
            weatherAnimation.appendChild(cloud);
        } else if (condition.includes("rain")) {
            const cloud = document.createElement("div");
            cloud.classList.add("cloud");
            weatherAnimation.appendChild(cloud);

            const rain = document.createElement("div");
            rain.classList.add("rain");
            for (let i = 0; i < 3; i++) {
                const drop = document.createElement("div");
                drop.classList.add("drop");
                rain.appendChild(drop);
            }
            weatherAnimation.appendChild(rain);
        }
    }

    // Simulated Weather Data (Replace with API call if needed)
    function fetchWeather() {
        const weatherDetails = document.getElementById("weather-details");
        const temperature = document.getElementById("temperature");
        const condition = document.getElementById("condition");

        // Simulated weather data
        const weatherData = {
            temp: 28, 
            condition: "sunny"
        };

        temperature.textContent = weatherData.temp;
        condition.textContent = weatherData.condition;

        weatherDetails.classList.remove("hidden");
        displayWeatherAnimation(weatherData.condition);
    }

    fetchWeather();
});
