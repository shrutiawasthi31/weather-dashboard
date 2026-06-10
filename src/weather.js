export function formatTimestamp(isoString) {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid timestamp");
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

export function getWeatherMood(condition) {
  const normalized = condition.toLowerCase();

  if (normalized.includes("sun")) return "Bright skies ahead";
  if (normalized.includes("cloud")) return "A softer, overcast day";
  if (normalized.includes("rain") || normalized.includes("shower")) {
    return "Keep an umbrella nearby";
  }
  if (normalized.includes("storm")) return "Expect dramatic weather";

  return "Steady conditions";
}

export function renderCurrentWeather(current, location) {
  return `
    <article class="temperature-card">
      <p class="location">${location}</p>
      <div class="temperature-row">
        <strong>${current.temperatureC}&deg;C</strong>
        <span>${current.condition}</span>
      </div>
      <p class="mood">${getWeatherMood(current.condition)}</p>
    </article>
    <dl class="stats-grid">
      <div>
        <dt>Feels like</dt>
        <dd>${current.feelsLikeC}&deg;C</dd>
      </div>
      <div>
        <dt>Humidity</dt>
        <dd>${current.humidity}%</dd>
      </div>
      <div>
        <dt>Wind</dt>
        <dd>${current.windKph} km/h</dd>
      </div>
    </dl>
  `.trim();
}

export function renderForecast(forecast) {
  return forecast
    .map(
      (day) => `
        <article class="forecast-card">
          <div>
            <p class="forecast-day">${day.day}</p>
            <p class="forecast-condition">${day.condition}</p>
          </div>
          <div class="forecast-meta">
            <span>${day.highC}&deg; / ${day.lowC}&deg;</span>
            <span>${day.precipitationChance}% rain</span>
          </div>
        </article>
      `.trim()
    )
    .join("");
}

export function createWeatherViewModel(weather) {
  return {
    updatedLabel: `Updated ${formatTimestamp(weather.updatedAt)}`,
    currentMarkup: renderCurrentWeather(weather.current, weather.location),
    forecastMarkup: renderForecast(weather.forecast)
  };
}
