import { sampleWeather } from "./data.js";
import { createWeatherViewModel } from "./weather.js";

function mountWeather(weather) {
  const lastUpdated = document.querySelector("#last-updated");
  const currentWeather = document.querySelector("#current-weather");
  const forecast = document.querySelector("#forecast");
  const viewModel = createWeatherViewModel(weather);

  lastUpdated.textContent = viewModel.updatedLabel;
  currentWeather.innerHTML = viewModel.currentMarkup;
  forecast.innerHTML = viewModel.forecastMarkup;
}

function refreshWeather() {
  const nextWeather = {
    ...sampleWeather,
    updatedAt: new Date().toISOString()
  };

  mountWeather(nextWeather);
}

document.querySelector("#refresh-button").addEventListener("click", refreshWeather);
mountWeather(sampleWeather);
