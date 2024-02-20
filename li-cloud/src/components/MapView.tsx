/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
import { useEffect, useState } from 'react';
import '../assets/MapViewStyle.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import { DivIcon,    LatLngExpression } from 'leaflet';
// import ProfileAvatarIcon from '../assets/test_avatar.jpg';

// import RoutingMachine from './RoutingMachine';
import FullLoadScreen from '../components/FullLoadScreen';

interface Location {
  latitude: number;
  longitude: number;
  address: string; // Address is optional
}

interface PropsTypes {
  getUserLocation: (data: Location| undefined) => void;
}

function MapView(props:PropsTypes) {
  const [userLocation, setUserLocation] = useState<Location>();

  const [errorFetchingLocation, setErrorFetchingLocation] = useState(false);
  const [loading, setLoading] = useState(false);

  const getLocation = (latitude: number, longitude: number, address:string) => {
    setUserLocation({ latitude, longitude, address });
    props.getUserLocation({ latitude, longitude, address });
  };

  const loadMap = async () => {
    try {
      setLoading(true);
  
      if (navigator.geolocation) {
        await new Promise<void>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              let addressName = '';
              try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
                const data = await response.json();
          
                addressName = data.display_name || 'Address not found';
                console.log(data.display_name);
              } catch (error) {
                console.error('Error fetching address:', error);
              }
              getLocation(latitude, longitude, addressName);
              resolve();
            },
            (error) => {
              console.error('Error getting user location:', error.message);
              setErrorFetchingLocation(true);
              alert('Please allow location access to use this feature.');
              reject(error);
            }
          );
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
        setErrorFetchingLocation(true);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
      
    }
  };
  

  useEffect(() => {
    
    loadMap();
  }, []);

  const locationToLatLngExpression = (location: Location): LatLngExpression => ({
    lat: location.latitude,
    lng: location.longitude,
  });

  const userProfileImage = localStorage.getItem('jur_ni_data_Profile_image') || ''; // Get the user profile image data

  const customIcon = new DivIcon({
    className: 'custom-icon',
    html: `<div style="width: 60px; height: 60px; background-color: #4D6DE3; border-radius: 60px 60px 0px 60px; position: relative; transform: rotate(45deg); display: flex; justify-content: center; align-items: center;">
            <img src=${userProfileImage} style="width: 80%; height: 80%; border-radius: 50%; transform: rotate(-45deg); object-fit: cover;">
        </div>`,
    iconSize: [60, 60],
  });
  
  
  return (
    <>

    {/* loading component */}
    {loading && <FullLoadScreen loadingTime={2}/>}

                  <div className='absolute mt-0 z-30' >
        <div className='w-[50%] h-fill flex flex-col '>
          <div className=''>
            <div className='map'>
              {(userLocation || errorFetchingLocation) && (
                <MapContainer
                className="map-container" 
                  center={userLocation ? locationToLatLngExpression(userLocation) : [0, 0]}
                  zoom={userLocation ? 15 : 0}
                  scrollWheelZoom={true}
                  style={{ height: '550px', width: '30vw', backgroundColor: '#4D6DE3' }}
                  zoomControl={false} // Disable zoom control
                >
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  />

  {/* Roads Layer (example using OpenStreetMap's Roads API) */}
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/roads/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  />
                  {userLocation && <Marker position={locationToLatLngExpression(userLocation)} icon={customIcon} />}
                  
                  
                  {/* Display an alternative map or message in case of an error fetching user location */}
                  {!userLocation && errorFetchingLocation && (
                    <div style={{ height: '5vh', width: '25vw', textAlign: 'center', position: 'absolute', zIndex: '10000', fontSize:'20px' }}>
                      <p style={{ backgroundColor: 'red', color: 'white'}}>Error fetching user location. Please allow location access to Get You'r Live Weather Report...</p>
                      {/* You can add more styling or information as needed */}
                    </div>
                  )}
                  
                </MapContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MapView;
