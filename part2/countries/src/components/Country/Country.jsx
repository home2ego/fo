import { useState, useEffect } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const Country = ({ country }) => {
  const { name, capital, area, languages, flags } = country;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`,
      )
      .then((response) => setWeather(response.data));
  }, []);

  if (!weather) return;

  return (
    <div>
      <h1>{name.common}</h1>
      <p>Capital {capital}</p>
      <p>Aria {area}</p>

      <h2>Languages</h2>

      <ul>
        {Object.values(languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={flags.svg} alt={`Flag of ${name.common}`} width={150} />

      <h2>Weather in {name.common}</h2>

      <p>Temperature {weather.main.temp} Celsius</p>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt=""
      />

      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Country;
