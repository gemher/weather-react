import React from "react";

export default function WeatherTemperature(props) {
  return (
    <div className="degrees">
      {Math.round(props.celsius)}
      °C
    </div>
  );
}
