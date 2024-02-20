import React, { useState, useEffect } from 'react';
import IMG01D from '../assets/icons/01d.svg';
import IMG01D from '../assets/icons/01d.svg';
import IMG01D from '../assets/icons/01d.svg';
import IMG01D from '../assets/icons/01d.svg';
import IMG01D from '../assets/icons/01d.svg';
import IMG01D from '../assets/icons/01d.svg';
import IMG01D from '../assets/icons/01d.svg';
import IMG01D from '../assets/icons/01d.svg';
import IMG01D from '../assets/icons/01d.svg';
import IMG01D from '../assets/icons/01d.svg';
import IMG01D from '../assets/icons/01d.svg';
import IMG01D from '../assets/icons/01d.svg';
import IMG01D from '../assets/icons/01d.svg';
import IMG01D from '../assets/icons/01d.svg';

interface WeatherData {
  location: string;
  main: string;
  temperature: number;
  imageCode: string;
}


function MainWeatherCard(props:WeatherData) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='flex flex-row justify-center items-center mt-10'>
        <div className='w-6/12 ml-3'>
          <img src={LOGO_IMAGE} alt="Logo" className="h-36" />
        </div>
        <div className='flex flex-col justify-center items-center ml-2 w-6/12'>
          <div>
            <h1 className='text-3xl font-bold italic'>{props.location}</h1>
            <h1 className='text-lg italic'>{dateTime.toLocaleString()}</h1>
            <br></br>
            <h1 className='text-2xl font-bold'>{props.main}</h1>
            <h1 className='text-xl font-bold'>{props.temperature}K</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainWeatherCard;
