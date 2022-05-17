import React from "react";
import WeatherIcons from "./WeatherIcons";
import "./WeatherForecastDay.css";

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
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        {day()} <strong>{maxTemp()}°</strong>/{minTemp()}°{" "}
        <WeatherIcons code={props.data.weather[0].icon} />
      </li>
    </ul>
  );
}
