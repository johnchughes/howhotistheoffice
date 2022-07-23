import { useEffect, useState } from "react";


const Weather = () => {

    const [weather, setWeather] = useState(null);

    const getWeatherInfo = () => {
        fetch('http://api.weatherapi.com/v1/current.json?key=59ce82749814495eb69135116222007&q=GL2 4LD&aqi=no')
        .then(response => response.json())
        .then(data => setWeather(data));
    }
    
    useEffect(() => {
        getWeatherInfo();
    }, []); 

    if(weather == null){
        return <div></div>
    }

    return (
        <div className="weather">
            <span>{weather.current.temp_c}<sup>&#8451;</sup></span>
            <span>{weather.current.condition.text}</span>
        </div>
    );
}

export default Weather;