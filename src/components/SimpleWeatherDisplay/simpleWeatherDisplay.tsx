import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SimpleWeatherDisplay.css';

interface WeatherData {
    weather: { icon: string }[];
    main: { temp: number };
    name: string;
}

const SimpleWeatherDisplay: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [city, setCity] = useState<string | null>(null);
    const apiKey = 'b73521b309f871a47131476534034035';

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get('https://ipapi.co/json/');
                const city = response.data.city;
                setCity(city);
            } catch (error) {
                console.error('Kullanıcının konumu alınırken hata oluştu:', error);
            }
        };

        fetchLocation();
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                if (city) {
                    const response = await axios.get<WeatherData>(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
                    );
                    setWeatherData(response.data);
                }
            } catch (error) {
                console.error('Hava durumu verisi alınırken hata oluştu:', error);
            }
        };

        fetchWeather();
    }, [city]);

    if (!weatherData) {
        return <div>Yükleniyor...</div>;
    }

    const iconCode = weatherData.weather[0].icon;
    const temperature = Math.round(weatherData.main.temp);
    const cityName = weatherData.name;

    return (
        <div className="weather-display">
            <span className="weather-info">{`${cityName}: ${temperature}°C`}</span>
            <img src={`http://openweathermap.org/img/w/${iconCode}.png`} alt="Hava Durumu" className="weather-icon" />
        </div>
    );
};

export default SimpleWeatherDisplay;