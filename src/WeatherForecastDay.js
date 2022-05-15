import React from "react";
import WeatherIcons from "./WeatherIcons";

export default function WeatherForecastDay(props) {
  function maxTemp() {
    let temperature = Math.round(props.data.temp.max);
    return `${temperature}`;
  }

  function minTemp() {
    let temperature = Math.round(props.data.temp.min);
    return `${temperature}`;
  }

  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  return (
    <div className="container">
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {day()} {maxTemp()}°/
            {minTemp()}° <WeatherIcons code={props.data.weather[0].icon} />
          </li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
          <li className="list-group-item">A third item</li>
          <li className="list-group-item">A third item</li>
        </ul>
      </div>
    </div>
  );
}
