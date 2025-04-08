function showWeather(state) {
    const weatherDetails = {
        "Maharashtra": "Sunny, 32°C",
        "Gujarat": "Partly Cloudy, 34°C",
        "Madhya Pradesh": "Rainy, 28°C",
        // Add more states and their respective weather
    };

    const weatherInfo = document.getElementById('weather-details');
    
    if (weatherDetails[state]) {
        weatherInfo.textContent = `Weather in ${state}: ${weatherDetails[state]}`;
    } else {
        weatherInfo.textContent = `Weather information not available for ${state}.`;
    }
}
