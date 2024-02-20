// import { useState } from 'react';
// import FullLoadScreen from '../../components/FullLoadScreen';

import MainWeatherCard from '../../components/MainWeatherCard';
import MapView from '../../components/MapView';
import { useEffect, useState } from 'react';
import WeatherDetailsCard from '../../components/WeatherDetailsCard';
import axios from 'axios';
import UserWeatherDTO from '../../DTOs/UserWeatherDTO';
import FullLoadScreen from '../../components/FullLoadScreen';
import LOGO_IMAGE from '../../assets/White_logo.png';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';

interface Location {
    latitude: number;
    longitude: number;
    address: string; // Address is optional
  }

  
function MainPage() {
    const [userLocation, setUserLocation] = useState<Location | undefined>();
    const [weatherData, setWeatherData] = useState<UserWeatherDTO>();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook
    
    useEffect(() => {
      // Fetch weather data when userLocation changes
      if (userLocation) {
        setLoading(true);
        axios.get(`http://localhost:9596/api/weather/current-data`)
          .then(response => {
            const resweatherData = response.data.data; 

            const userWeatherDTO = new UserWeatherDTO(
              resweatherData.description,
              resweatherData.temperature,
              resweatherData.feelsLike,
              resweatherData.minTemperature,
              resweatherData.maxTemperature,
              resweatherData.windSpeed,
              resweatherData.cloudiness,
              resweatherData.pressure,
              resweatherData.humidity,
              resweatherData.seaLevelPressure,
              resweatherData.imageCode,
              resweatherData.location,
              resweatherData.main
            );


          setWeatherData(userWeatherDTO);
          console.log(userWeatherDTO.toString());

          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, [userLocation]);

    const getUserLocation = (data: any) => {
        setUserLocation(data);
      };


      const LogoutBtnClicked = (): void => {
        // Perform logout actions here
        navigate('/'); // Navigate to '/' route on logout button click
      };

  return (
    <>
      {/* loading component */}
      {loading && <FullLoadScreen loadingTime={5}/>}

      <div
      className='flex justify-center flex-col items-center h-screen  bg-white'
    >
      <div className='flex flex-row justify-center align-middle items-center'>
      <img src={LOGO_IMAGE} alt="Logo" className="h-10" />
      <h1 className='text-black text-lg italic font-semibold ml-3'>Lead InnovationZ Cloud Weather App</h1>
      </div>
      
      <br></br>
      <div className='border-2 border-[#4D6DE3] rounded-xl shadow-2xl md:w-11/12 md:h-[600px] bg-white md:rounded-2xl flex md:flex-row flex-col md:justify-center md:items-center h-screen w-screen'
       
      >
        {/* LSide */}
        <div className='md:w-4/12 md:h-[560px] flex justify-center items-center md:ml-4 w-full '>
            {/* Map */}
            <div className='w-11/12 h-[380px]  mt-5 md:h-full'>
                <MapView getUserLocation={getUserLocation} />
            </div>
        </div>

        {/* RSide */}
        <div className='md:w-8/12 md:h-[540px] w-full  flex flex-col justify-center items-center space-y-5'>
            {/* First Row */}
            <div className='md:w-11/12 md:h-[350px] h-96 w-full flex md:flex-row flex-col space-x-3 '>
                {/* first card */}
                <div className='md:w-6/12 md:h-ful w-full h-full border-2 border-[#4D6DE3] rounded-xl shadow-2xl flex justify-center items-center'>
                {weatherData && (
                  <MainWeatherCard
                    location={weatherData.getLocation().toString()}
                    main={weatherData.getMain().toString()}
                    temperature={weatherData.getTemperature()}
                    imageCode={weatherData.getImageCode().toString()}
                  />
                )}
                </div>

                {/* second card */}
                <div className='md:w-6/12 md:h-[350px]  w-full h-full border-2 border-[#4D6DE3] rounded-xl shadow-2xl flex justify-center items-center'>
                {weatherData && (
                  <WeatherDetailsCard
                    description={weatherData.getDescription()}
                    feelsLike={weatherData.getFeelsLike().toString()}
                    minTemperature={weatherData.getMinTemperature().toString()}
                    maxTemperature={weatherData.getMaxTemperature().toString()}
                    windSpeed={weatherData.getWindSpeed().toString()}
                    cloudiness={weatherData.getCloudiness().toString()}
                    pressure={weatherData.getPressure().toString()}
                    humidity={weatherData.getHumidity().toString()}
                    seaLevelPressure={weatherData.getSeaLevelPressure().toString()}
                  />
                )}
                </div>
            </div>

            {/* Second Row */}
            <div className='w-11/12 h-96  rounded-xl shadow-2xl flex items-end justify-center items-center flex-col'>
              <br></br>
              
              <Button variant="outlined" color="error" onClick={LogoutBtnClicked}>Logout</Button>
              <h1 className='mt-10 text-sm mb-5 text-[#4D6DE3]'>Developed by @Kaligu jayanath</h1>
            </div>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default MainPage