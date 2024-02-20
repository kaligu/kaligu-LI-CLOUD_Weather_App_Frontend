import React, { useState } from 'react';
import BACK_IMAGE from '../../assets/login_back_img.jpg';
import LOGO_IMAGE from '../../assets/logo_image_big.png';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import FullLoadScreen from '../../components/FullLoadScreen';

function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = (credentialResponse:any) => {
    setLoading(true);

    if (credentialResponse?.credential) {
      console.log(credentialResponse);

      // axios.post(URL_SERVERAPI_USER_LOGIN, {
      //   userData: credentialResponse,
      // })
      // .then(function (response:any) {
      //   console.log(response);
      //   // Handle the response as needed
      //   const userProfileImage = response.data._data.picture;

      // // Store user profile image data in local storage
      // localStorage.setItem('jur__data_Profile_image', userProfileImage);

      // })
      // .catch(function (error: any) {
      //   console.log(error);
      // })
      // .finally(() => {
      //   setLoading(false); // Set loading to false on login error

      // });
    } else {
      console.log('Credential not available');
    }
  };

  return (
    <>
    {/* loading component */}
    {loading && <FullLoadScreen loadingTime={5}/>}
    
    <div
      className='flex justify-center items-center h-[700px] bg-[#070D59]'
    >
      <div className='w-5/6 h-3/4 bg-cyan-400 rounded-2xl flex flex-col justify-center items-center'
       style={{backgroundImage: `url(${BACK_IMAGE})`, backgroundSize: 'cover'}}
      >
        <div>
          <img src={LOGO_IMAGE} alt="Logo" className="h-64" />
        </div>

        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-3xl text-yellow-200'>Weather</h1>
          <h1 className='text-3xl text-cyan-100'>Forecast App.</h1>
          <h1 className='text-xl text-gray-50'>It's the newest weather app of LI Innovationz.It has a bunch of features and that includes most of the ones that every weather app has.</h1>
          <h1 className='text-xl text-gray-50'>Login to Your Account using One Click.</h1>
        </div>

        <div className='mt-5'>
        <GoogleOAuthProvider  clientId='439833973834-e1inhrr6q80nvv8kmtr0i3m9lpbh54nn.apps.googleusercontent.com'>
      <GoogleLogin
        size='large'
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log('Login Failed');
            setLoading(false); // Set loading to false on login error
          }}
        useOneTap
      />
    </GoogleOAuthProvider>
    </div>
        
      </div>
    </div>
    </>
  );
}

export default LoginPage;
