import test from "node:test";
import assert from "node:assert/strict";

import {
  createWeatherViewModel,
  formatTimestamp,
  getWeatherMood,
  renderForecast
} from "../src/weather.js";
import { sampleWeather } from "../src/data.js";

test("formatTimestamp returns a readable label", () => {
  assert.match(formatTimestamp("2026-06-10T09:30:00Z"), /Jun/);
});

test("formatTimestamp throws on invalid input", () => {
  assert.throws(() => formatTimestamp("invalid-date"), /Invalid timestamp/);
});

test("getWeatherMood handles common condition categories", () => {
  assert.equal(getWeatherMood("Sunny"), "Bright skies ahead");
  assert.equal(getWeatherMood("Cloudy"), "A softer, overcast day");
  assert.equal(getWeatherMood("Heavy Showers"), "Keep an umbrella nearby");
});

test("renderForecast includes each forecast card", () => {
  const markup = renderForecast(sampleWeather.forecast);

  assert.match(markup, /Thu/);
  assert.match(markup, /Fri/);
  assert.match(markup, /Sat/);
});

test("createWeatherViewModel assembles all display sections", () => {
  const viewModel = createWeatherViewModel(sampleWeather);

  assert.match(viewModel.updatedLabel, /^Updated /);
  assert.match(viewModel.currentMarkup, /Bengaluru/);
  assert.match(viewModel.forecastMarkup, /% rain/);
});
