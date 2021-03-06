import "./App.css";
import WeatherSearch from "./WeatherSearch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherSearch />
      </header>
      <h6>
        <a
          href="https://github.com/gemher/weather-react"
          target="_blank"
          rel="noreferrer"
        >
          Open-source code
        </a>{" "}
        by Gema Hernandez
      </h6>
    </div>
  );
}

export default App;
