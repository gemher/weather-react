import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function showWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=021be1bf6bbbf0a54cf5f03d5e6f32ee&units=metric`;
    axios.get(url).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  const form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        className="city-submit"
        placeholder="City"
        onChange={updateCity}
      />
      <button type="Submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul className="Attributes">
          <li className="city-Found">
            <strong>Current conditions found:</strong>
          </li>
          <br />
          <li>
            <strong>Temperature:</strong> {Math.round(weather.temperature)}°C
          </li>
          <li>
            <strong>Humidity:</strong> {weather.humidity}%
          </li>
          <li>
            <strong>Winds:</strong> {weather.wind}km/h
          </li>
          <li>
            <strong>Description:</strong> {weather.description}
          </li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
