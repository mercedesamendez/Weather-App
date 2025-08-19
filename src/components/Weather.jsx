import React, { useEffect, useRef, useState } from 'react';
import '../styles/Weather.css';
import WeatherDetails from './WeatherDetails';
import SearchBar from './SearchBar';

const Weather = () => {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const search = async (query) => {
    if (!query) {
      alert("Enter a location");
      return;
    }
    try {
      const API_KEY = import.meta.env.VITE_APP_ID;
      let url = "";
      const trimmedQuery = query.trim();

      // checking if input is a ZIP
      if (!isNaN(trimmedQuery) && trimmedQuery.length === 5) {
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${trimmedQuery}&units=imperial&appid=${API_KEY}`;
      } else {
        // Geocoding for city, state, address, or landmark
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(trimmedQuery)}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoRes.json();

        if (!geoData[0]) {
          alert("Location not found");
          return;
        }
        const { lat, lon } = geoData[0];
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
      }

      // Fetching the weather data
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // The icon URL from the API
      const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      // Saving the data into the state
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: iconURL,
        description: data.weather[0].description
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
      alert("Error fetching weather data. Please try again.");
    }
  };

  // Default location when user loads
  useEffect(() => {
    search("Dallas");
  }, []);

  if (!weatherData) {
    return <div> Loading...</div>;
  };

  return (
    <div className='weather'>
      <SearchBar inputRef={inputRef} onSearch={search} />
      <WeatherDetails weatherData={weatherData} />
    </div>
  );
};

export default Weather;