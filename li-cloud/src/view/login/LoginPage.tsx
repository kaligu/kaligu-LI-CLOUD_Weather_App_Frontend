import { useState } from 'react';
import BACK_IMAGE from '../../assets/login_back_img.jpg';
import LOGO_IMAGE from '../../assets/logo_image_big.png';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import FullLoadScreen from '../../components/FullLoadScreen';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const handleGoogleLogin = (credentialResponse:any) => {
    setLoading(true);

    if (credentialResponse?.credential) {
      console.log(credentialResponse);

      axios.post('439833973834-e1inhrr6q80nvv8kmtr0i3m9lpbh54nn.apps.googleusercontent.com', {
        userData: credentialResponse,
      })
      .then(function () {
        
        const decoded = jwtDecode(credentialResponse.credential);
        localStorage.setItem('user', JSON.stringify(decoded));
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        // Now you can access the picture URL from the user object
        const profilePicture = user.picture;

      // Store user profile image data in local storage
      localStorage.setItem('li_cloud__data_Profile_image', profilePicture);
      navigate('/main'); // Redirect to LoginPage route
      
      })
      .catch(function (error: any) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false on login error

      });
    } else {
      navigate('/LoginPage'); // Redirect to LoginPage route
      console.log('Credential not available');
    }
  };

  return (
    <>
    {/* loading component */}
    {loading && <FullLoadScreen loadingTime={5}/>}
    
    <div
      className='flex justify-center items-center h-screen  bg-white'
    >
      <div className='border-2 border-[#4D6DE3] rounded-xl shadow-2xl  md:w-5/6 md:h-[500px] bg-[#4D6DE3] md:rounded-2xl flex flex-col justify-center items-center h-screen w-screen'
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
