import React, { useState, useEffect } from 'react';
import IMG01D from '../assets/icons/01d.svg';
import IMG01N from '../assets/icons/01n.svg';
import IMG02D from '../assets/icons/02d.svg';
import IMG02N from '../assets/icons/02n.svg';
import IMG03D from '../assets/icons/03d.svg';
import IMG03N from '../assets/icons/03n.svg';
import IMG04D from '../assets/icons/04d.svg';
import IMG04N from '../assets/icons/04n.svg';
import IMG09D from '../assets/icons/09d.svg';
import IMG09N from '../assets/icons/09n.svg';
import IMG010D from '../assets/icons/10d.svg';
import IMG010N from '../assets/icons/10n.svg';
import IMG011D from '../assets/icons/11d.svg';
import IMG011N from '../assets/icons/11n.svg';
import IMG013D from '../assets/icons/13d.svg';
import IMG013N from '../assets/icons/13n.svg';
import IMG050D from '../assets/icons/50d.svg';
import IMG050N from '../assets/icons/50d.svg';

interface WeatherData {
  location: string;
  main: string;
  temperature: number;
  imageCode: string;
}

function MainWeatherCard(props: WeatherData) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Object mapping image codes to their corresponding import paths
  const imageMap: { [key: string]: string } = {
    '01d': IMG01D,
    '01n': IMG01N,
    '02d': IMG02D,
    '02n': IMG02N,
    '03d': IMG03D,
    '03n': IMG03N,
    '04d': IMG04D,
    '04n': IMG04N,
    '09d': IMG09D,
    '09n': IMG09N,
    '010d': IMG010D,
    '010n': IMG010N,
    '011d': IMG011D,
    '011n': IMG011N,
    '013d': IMG013D,
    '013n': IMG013N,
    '050d': IMG050D,
    '050n': IMG050N,
  };

  // Select the image based on imageCode
  const selectedImage = imageMap[props.imageCode];

  return (
    <>
      <div className='flex flex-row justify-center items-center'>
        <div className='w-6/12 ml-3'>
          {/* Use the selected image */}
          <img src={selectedImage} alt="Weather Icon" className="h-36" />
        </div>
        <div className='flex flex-col justify-center items-center ml-2 w-6/12'>
          <div>
            <h1 className='text-3xl font-bold '>{props.location}</h1>
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
