import React from 'react'

function WeatherDetailsCard() {
  return (
    <>
     <div className='flex flex-col justify-center items-start ml-3'>
        <h1 className='mt-2'>📙Description : Few Clouds</h1>
        <h1>🔥Feels Like: 308.66K</h1>
        <h1>🕒Minimum Temperature: 304.46K</h1>
        <h1>🕘Maximum Temperature:: 304.46K</h1>
        <h1>🍃 Wind Speed: 4.2m/s</h1>
        <h1>☁️Cloudiness: 23%</h1>
        <h1>⏏Pressure: 1008hPa</h1>
        <h1>💦Humidity: 60%</h1>
        <h1>🌊Sea Level Pressure: 1008hPa </h1>
        <h1>🕳️Ground Level Pressure: 1008hPa </h1>
     </div>
    </>
  )
}

export default WeatherDetailsCard