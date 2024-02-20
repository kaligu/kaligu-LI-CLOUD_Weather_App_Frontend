// import { useState } from 'react';
// import FullLoadScreen from '../../components/FullLoadScreen';
import BACK_IMAGE from '../../assets/main_back_Image.jpg';
import MainWeatherCard from '../../components/MainWeatherCard';
import MapView from '../../components/MapView';
import { useEffect, useState } from 'react';

interface Location {
    latitude: number;
    longitude: number;
    address: string; // Address is optional
  }
  
function MainPage() {
    // const [loading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState<Location | undefined>();
    
    
    useEffect(() => {
 
    }, [userLocation]);

    const getUserLocation = (data: any) => {
        console.log("******************* UserLocation"+data.longitude)
        setUserLocation(data);
      };


  return (
    <>
      {/* loading component */}
      {/* {loading && <FullLoadScreen loadingTime={5}/>} */}

      <div
      className='flex justify-center items-center h-screen  bg-[#070D59]'
    >
      <div className='md:w-11/12 md:h-[600px] bg-cyan-400 md:rounded-2xl flex md:flex-row flex-col md:justify-center md:items-center h-screen w-screen'
       style={{backgroundImage: `url(${BACK_IMAGE})`, backgroundSize: 'cover'}}
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
            <div className='md:w-11/12 md:h-96 h-96 w-full bg-red-600 flex md:flex-row flex-col space-x-2'>
                {/* first card */}
                <div className='md:w-6/12 md:h-full bg-green-200 w-full h-full'>
                  <MainWeatherCard/>
                </div>

                {/* second card */}
                <div className='md:w-6/12 md:h-full bg-green-400 w-full h-full'></div>
            </div>

            {/* Second Row */}
            <div className='w-11/12 h-96 bg-red-800'></div>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default MainPage