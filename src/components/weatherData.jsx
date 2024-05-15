import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Stack,
  Divider,
  Skeleton
} from "@mui/material/";
import bg from '../assets/bg.jpg'

export function WeatherData() {
  const [, setlocation] = useState([]);
  const [error, setError] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

  useEffect(() => {
    fetchData();
    searchBarData();
    famousCityData();
  }, []);
  const searchBarData = () => {
    document.getElementById("searchBar").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const search = e.target.value.toLowerCase()
        setSearchData(search);
        fetchData(search);
      }
    });

  };


  const famousCityData = () => {
    document.getElementById('card').addEventListener('click', (e) => {
      const search = e.srcElement.innerText
      setSearchData(search);
      fetchData(search);
    })
  }

  const fetchData = async (location) => {
    if (!location) return;
    const result = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=""&q=${location}&days=1&aqi=yes&alerts=yes`
    );
    result
      .json()
      .then((json) => {
        setWeatherData({
          icon: json?.current.condition.icon,
          temp: json?.forecast.forecastday[0].day.avgtemp_c,
          humidity: json?.current.humidity,
          wind_speed: json?.current.wind_kph,
          pressure: json?.current.pressure_mb,
          condition: json?.current.condition.text,
          maxTemp: json?.forecast.forecastday[0].day.maxtemp_c,
          minTemp: json?.forecast.forecastday[0].day.mintemp_c,
          sunrise: json?.forecast.forecastday[0].astro.sunrise,
          sunset: json?.forecast.forecastday[0].astro.sunset,
          windDegree: json?.current.wind_degree,
          region: json?.location.region,
          windDir: json?.current.wind_dir
        })
        setError([]);
        setlocation(json?.location.region);
        setLoading(true)
      })
      .catch((err) => {
        return setError(
          "Invalid Location. Please try again with a valid location",
          err.message
        );
      })
  };
  if (searchData.length === 0) return;
  return (
    <div>
      <h2 className="error">{error}</h2>
      {isLoading ? (
        <Grid padding={3} sx={{ maxWidth: '80%', margin: 'auto', marginBottom: 5, borderRadius: '10px', backgroundImage: `url(${bg})`, backgroundSize: 'cover', color: 'white', textShadow: '1.5px 1px 2px #000' }}>
          <Stack direction={{ xs: "column", sm: "row" }} alignItems='center'>
            <Grid item>
              <Typography variant="h3" fontSize={{ xs: '40px' }}>
                {searchData.toString().toUpperCase()}
              </Typography>
              <Typography>
                {weatherData.region}
              </Typography>
              <Typography marginBottom={7}>
                {weekday[new Date().getDay()]}, {month[new Date().getMonth()]} {new Date().getDate()} {new Date().getFullYear()}
              </Typography>
            </Grid>
            <Grid item container sx={{ justifyContent: { xs: 'center', md: 'right' } }}>
              <Stack direction={{ xs: "column", sm: "column" }} >
                  <Stack direction='column' alignItems='center' sx={{ textAlign: { xs: 'center' } }}>
                    <Typography variant="h1" fontSize={{ xs: '85px' }}>
                      {weatherData.temp}°C
                    </Typography>
                    <Typography variant="h4" marginBottom={3} >
                      {weatherData.condition}
                    </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Stack>
          <Grid item container>
            <Grid item xs={6} md={3}>
              <Typography variant="h6">
                Min temp
              </Typography>
              <Typography variant="h5">
                {weatherData.minTemp}°C
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h6">
                Max temp
              </Typography>
              <Typography variant="h5">
                {weatherData.maxTemp}°C
              </Typography>
              <Grid item container>
              </Grid>
            </Grid>
            <Grid item xs={6} md={3}>
              <Grid item>
                <Typography variant="h6">
                  Humidity
                </Typography>
                <Typography variant="h5">
                  {weatherData.humidity}%
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={6} md={3}>
              <Grid item>
                <Typography variant="h6">
                  Wind speed
                </Typography>
                <Typography variant="h5">
                  {weatherData.wind_speed} kph
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: '1%', marginBottom: '1%', width: '87%', display: { xs: 'none', md: 'block' } }} />
          <Grid item container>
            <Grid item xs={6} md={3}>
              <Typography variant="h6">
                Pressure (mb)
              </Typography>
              <Typography variant="h5">
                {weatherData.pressure}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h6">
                Sunrise
              </Typography>
              <Typography variant="h5">
                {weatherData.sunrise}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h6">
                Sunset
              </Typography>
              <Typography variant="h5">
                {weatherData.sunset}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h6">
                Wind direction
              </Typography>
              <Typography variant="h5">
                {weatherData.windDegree}° {weatherData.windDir}
              </Typography>
            </Grid>

          </Grid>
        </Grid>

      ) : (
        <Grid item sx={{ width: '80%', margin: 'auto', marginBottom: 5 }}>
          <Skeleton
            variant='rounded'
            animation='wave'
            width='100%'
            height={50}
          />

        </Grid>
      )}
    </div>
  );
}
