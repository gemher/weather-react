import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }
  function loadApi() {
    let apiKey = "021be1bf6bbbf0a54cf5f03d5e6f32ee";
    let longitude = props.coordinates.lon;
    let latitude = props.coordinates.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }

  if (loaded) {
    return (
      <div className="container forecast">
        <div className="card">
          {forecast.map(function (dailyForecast, index) {
            if (index < 6) {
              return (
                <ul className="list-group list-group-flush" key={index}>
                  <li className="list-group-item">
                    <WeatherForecastDay data={dailyForecast} />
                  </li>
                </ul>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    loadApi();

    return null;
  }
}
