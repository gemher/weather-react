import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";
import TempConversion from "./TempConversion";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function showWeather(response) {
    setLoaded(true);
    setWeather({
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
    let city = "London";
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

  if (loaded) {
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
            <strong>Winds:</strong> {weather.wind}km/h
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
