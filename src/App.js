import "./App.css";
import WeatherSearch from "./WeatherSearch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Finder</h1>

        <WeatherSearch />
      </header>
      <h6>
        <a href="#" target="_blank" rel="noreferrer">
          Open-source code
        </a>{" "}
        by Gema Hernandez
      </h6>
    </div>
  );
}

export default App;
