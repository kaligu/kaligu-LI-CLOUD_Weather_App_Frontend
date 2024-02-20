import React from 'react';

interface WeatherDetails {
    description: string;
    feelsLike: string;
    minTemperature: string;
    maxTemperature: string;
    windSpeed: string;
    cloudiness: string;
    pressure: string;
    humidity: string;
    seaLevelPressure: string;
    groundLevelPressure: string;
}

function WeatherDetailsCard(props: WeatherDetails) {
  return (
    <>
     <div className='flex flex-col justify-center items-start ml-3'>
        <h1 className='mt-2'>📙Description : {props.description}</h1>
        <h1>🔥Feels Like: {props.feelsLike}</h1>
        <h1>🕒Minimum Temperature: {props.minTemperature}</h1>
        <h1>🕘Maximum Temperature: {props.maxTemperature}</h1>
        <h1>🍃 Wind Speed: {props.windSpeed}</h1>
        <h1>☁️Cloudiness: {props.cloudiness}</h1>
        <h1>⏏Pressure: {props.pressure}</h1>
        <h1>💦Humidity: {props.humidity}</h1>
        <h1>🌊Sea Level Pressure: {props.seaLevelPressure}</h1>
        <h1>🕳️Ground Level Pressure: {props.groundLevelPressure}</h1>
     </div>
    </>
  )
}

export default WeatherDetailsCard;
