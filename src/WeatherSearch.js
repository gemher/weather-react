import React, { useState } from "react";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";
import WeatherTemperature from "./WeatherTemperature";
import FormattedDate from "./FormattedDate";
import WeatherIcons from "./WeatherIcons";

export default function WeatherSearch() {
  const [city, setCity] = useState("Barcelona");
  const [weather, setWeather] = useState({ loaded: false });

  function showWeather(response) {
    setWeather({
      loaded: true,
      coordinates: response.data.coord,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
    });
  }

  function search() {
    const apiKey = "021be1bf6bbbf0a54cf5f03d5e6f32ee";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showWeather);
  }
  function handleSubmit(event) {
    event.preventDefault();
    search(city);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  const form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        className="city-search"
        placeholder="Find a City"
        onChange={updateCity}
      />
      <button type="Submit" className="city-submit">
        Search
      </button>
    </form>
  );

  if (weather.loaded) {
    return (
      <div>
        {form}
        <div className="container">
          <div className="row">
            <div className="col-6">
              <br />
              <h1 className="city-Found">
                {weather.city}
                <WeatherTemperature celsius={weather.temperature} />
                <FormattedDate date={weather.date} />
              </h1>
            </div>
            <div className="col-6">
              <ul className="Attributes">
                <WeatherIcons code={weather.icon} />
                <li className="text-capitalize">{weather.description}</li>
                <li>
                  <strong>Humidity:</strong> {weather.humidity}%
                </li>
                <li>
                  <strong>Winds:</strong> {Math.round(weather.wind)}km/h
                </li>
              </ul>
            </div>
          </div>
          <WeatherForecast coordinates={weather.coordinates} />
        </div>
      </div>
    );
  } else {
    search();
    return form;
  }
}
