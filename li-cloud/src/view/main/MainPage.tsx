// import { useState } from 'react';
// import FullLoadScreen from '../../components/FullLoadScreen';
import BACK_IMAGE from '../../assets/main_back_Image.jpg';
import LOGO_IMAGE from '../../assets/logo_image_big.png';
import MapView from '../../components/MapView';
import { useEffect, useState } from 'react';

function MainPage() {
    // const [loading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState<Location | undefined>();
    const [clickedLocation, setClickedLocation] = useState<Location | undefined>();
    
    useEffect(() => {
 
    }, [userLocation, clickedLocation]);

    const getUserLocation = (data: Location | undefined) => {
        setUserLocation(data);
      };

      const getClickedLocation = (data: Location | undefined) => {
        setClickedLocation(data);
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
                <MapView />
            </div>
        </div>

        {/* RSide */}
        <div className='md:w-8/12 md:h-[540px] w-full  flex flex-col justify-center items-center space-y-5'>
            {/* First Row */}
            <div className='md:w-11/12 md:h-96 h-96 w-full bg-red-600 flex md:flex-row flex-col space-x-2'>
                {/* first card */}
                <div className='md:w-6/12 md:h-full bg-green-200 w-full h-full'></div>

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