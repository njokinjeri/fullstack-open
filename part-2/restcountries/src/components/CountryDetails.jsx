import React from 'react';
import {useState, useEffect} from "react";
import axios from "axios";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_OPENWEATHER_KEY
  const capital = country.capital?.[0];

  useEffect(() => {
    if (!capital) return;

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: capital,
              units: "metric",
              appid: api_key,
            },
          }
        );
        setWeather(response.data)
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };
    fetchWeather();
  }, [capital, api_key])

  const languages = Object.values(country.languages || {});
  return (
    <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital?.[0] || 'N/A'}</p>
        <p>Area: {country.area}</p>

        <h3>Languages:</h3>
        <ul>
            {languages.map(lang => <li key={lang}>{lang}</li>)}
        </ul>

        <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
        { weather && (
          <div>
            <h3>Weather in {capital}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description} />
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
    </div>
  )
}

export default CountryDetails