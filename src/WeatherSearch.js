import React, { useState } from "react";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";
import TempConversion from "./TempConversion";
import FormattedDate from "./FormattedDate";

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
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
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
        placeholder="City"
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
        <h3 className="city-Found">
          <strong>Conditions found for: </strong>
          <br />
          {weather.city}
          <FormattedDate date={weather.date} />
        </h3>
        <ul className="Attributes">
          <TempConversion celsius={weather.temperature} />
          <img src={weather.icon} alt={weather.description} />
          <li>{weather.description}</li>
          <li>
            <strong>Humidity:</strong> {weather.humidity}%
          </li>
          <li>
            <strong>Winds:</strong> {Math.round(weather.wind)}km/h
          </li>
        </ul>
        <WeatherForecast coordinates={weather.coordinates} />
      </div>
    );
  } else {
    search();
    return form;
  }
}
