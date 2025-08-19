import React from "react";
import { WiHumidity, WiStrongWind } from 'react-icons/wi';

const WeatherDetails = ({ weatherData }) => {
    return (
        <>
            <img src={weatherData.icon} alt={weatherData.description} className='weather-icon' />
            <p className='location'>{weatherData.location}</p>
            <p className='temperature'>{weatherData.temperature}°F</p>

            <div className="weather-data">
                <div className="col">
                    <WiHumidity size={40} />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <WiStrongWind size={40} />
                    <div>
                        <p>{weatherData.windSpeed} </p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeatherDetails;
