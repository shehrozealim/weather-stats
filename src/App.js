import { WeatherData } from "./components/weatherData";
import { SearchBar } from "./components/searchBar";
import { WeatherForecast } from "./components/weatherForecast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ForecastInfo } from "./components/forecastInfo";
import { PageNotFound } from "./components/404";

function App() {
  return (
    <div>
      <Routes>
        <Route
          element={
            <div>
              <SearchBar />
              <WeatherData />
              <WeatherForecast />
              <title>Weather App</title>
            </div>
          }
          exact path="/"
        />
        <Route element={<ForecastInfo />} exact path="/:location/:date/:i"/>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
