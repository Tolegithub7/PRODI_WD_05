const apiKey = "6287f0cb52048baf7ab296e4e4cbdf4b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search input");
  const searchButton = document.querySelector(".search button");
  const weatherIcon = document.querySelector(".weather-icon");
  const temperatureElement = document.querySelector(".temp");
  const cityElement = document.querySelector(".city");
  const humidityElement = document.querySelector(".humidity");
  const windElement = document.querySelector(".Wind");

  searchButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    const cityName = searchInput.value;
    if (cityName) {
      getWeatherData(cityName);
    }
  });

  async function getWeatherData(city) {
    try {
      const response = await fetch(
        `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === "404") {
        alert("City not found. Please enter a valid city name.");
        return;
      }

      updateWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  function updateWeatherData(data) {
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

    weatherIcon.src = iconUrl;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    cityElement.textContent = data.name;
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${data.wind.speed} km/h`;
  }
});
