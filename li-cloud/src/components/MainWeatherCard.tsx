import React from 'react'
import LOGO_IMAGE from '../assets/logo_image_big.png';

function MainWeatherCard() {
  return (
    <>
      <div className='flex flex-row justify-center items-center mt-10'>
        <div className='w-6/12 ml-3'>
        <img src={LOGO_IMAGE} alt="Logo" className="h-36" />
        </div>
        <div className='flex flex-col justify-center items-center ml-2 w-6/12'>
            <div></div>
            <h1 className='text-3xl font-bold italic'>Horana </h1>
            <h1 className='text-xl italic'>Today 02:85</h1>
            <br></br>
            <h1 className='text-2xl font-bold'>Clouds</h1>
            <h1 className='text-xl font-bold'>304.46 F</h1>
            
            
            
            
            
        </div>

      </div>
    </>
  )
}

export default MainWeatherCard