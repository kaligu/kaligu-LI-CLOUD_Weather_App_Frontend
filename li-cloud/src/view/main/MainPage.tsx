// import { useState } from 'react';
// import FullLoadScreen from '../../components/FullLoadScreen';
import BACK_IMAGE from '../../assets/main_back_Image.jpg';
import LOGO_IMAGE from '../../assets/logo_image_big.png';

function MainPage() {
    // const [loading, setLoading] = useState(false);

  return (
    <>
      {/* loading component */}
      {/* {loading && <FullLoadScreen loadingTime={5}/>} */}

      <div
      className='flex justify-center items-center h-screen  bg-[#070D59]'
    >
      <div className='md:w-11/12 md:h-[600px] bg-cyan-400 md:rounded-2xl flex flex-col justify-center items-center h-screen w-screen'
       style={{backgroundImage: `url(${BACK_IMAGE})`, backgroundSize: 'cover'}}
      >
        <div>
          <img src={LOGO_IMAGE} alt="Logo" className="h-60" />
        </div>

        <div className='flex flex-col justify-center items-center w-11/12'>
          <h1 className='text-3xl text-yellow-200'>Weather</h1>
          <h1 className='text-3xl text-cyan-100'>Forecast App.</h1>
          <h1 className='text-xl text-gray-50'>It's the newest weather app of LI Innovationz.It has a bunch of features and that includes most of the ones that every weather app has.</h1>
          <h1 className='text-xl text-gray-50'>Login to Your Account using One Click.</h1>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default MainPage