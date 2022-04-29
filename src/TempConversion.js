import React, { useState } from "react";

export default function TempConversion(props) {
  const [unit, setUnit] = useState("celsius");
  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }
  function showCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }
  function fahrenheit() {
    return (props.celsius * 9) / 5 + 32;
  }
  if (unit === "celsius") {
    return (
      <li className="degrees">
        {Math.round(props.celsius)}
        °C |{" "}
        <a href="/" onClick={showFahrenheit}>
          °F
        </a>
      </li>
    );
  } else {
    return (
      <li className="degrees">
        {Math.round(fahrenheit())}
        <a href="/" onClick={showCelsius}>
          °C
        </a>{" "}
        | °F
      </li>
    );
  }
}
