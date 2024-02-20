/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
import { useEffect, useState } from 'react';
import '../assets/MapViewStyle.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { DivIcon,    LatLngExpression } from 'leaflet';
// import ProfileAvatarIcon from '../assets/test_avatar.jpg';
import CurrentLocationIcon from '../assets/current_location.png';
// import RoutingMachine from './RoutingMachine';
import FullLoadScreen from '../components/FullLoadScreen';

interface Location {
  latitude: number;
  longitude: number;
}

interface TripRouteMarker {
  num:number;
  latitude: number;
  longitude: number;
  address: string;
}
interface PropsTypes {
  getUserLocation: (data: Location| undefined) => void;
  getClickedLocation: (data: Location| undefined) => void;
}

function MapView() {
  const [userLocation, setUserLocation] = useState<Location>();
  const [markers, setMarkers] = useState<Array<Location>>([]);
  const [tripRouteMarkers, setTripRouteMarkers] = useState<Array<TripRouteMarker>>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [errorFetchingLocation, setErrorFetchingLocation] = useState(false);
  const [loading, setLoading] = useState(false);

  const getLocation = (latitude: number, longitude: number) => {
    setUserLocation({ latitude, longitude });
    // props.getUserLocation({ latitude, longitude });
    // props.getClickedLocation({ latitude, longitude });
  };

  const handleMapClick = async (event: any) => {
    
    const { lat, lng } = event.latlng;
    const newMarker = { latitude: lat, longitude: lng };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`);
      const data = await response.json();

      const addressName = data.display_name || 'Address not found';
      setTripRouteMarkers((prevTripRouteMarkers) => [
        ...prevTripRouteMarkers,
        { latitude: lat, longitude: lng,num:0, address: addressName },
      ]);
      // props.getUserTotalTripDataMarker({ latitude: lat, longitude: lng,num:0, address: addressName });

      setTimeout(function() {
        const routingDataElement = document.querySelector(".leaflet-routing-container .leaflet-routing-alternatives-container .leaflet-routing-alt h3");
  let text = (routingDataElement?.textContent) || ',';
  let words = text.split(', ');

      // props.getUserTotalTripDistance((words[0]));
      // props.getUserTotalTripTime((words[1]));
      
    }, 2000);
      
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  useEffect(() => {
    setRefreshKey((prevKey) => prevKey + 1);
    // Log details from Leaflet Routing Machine
    
  }, [tripRouteMarkers]);

  const handleButtonClick = async () => {
    try {
      
  
      if (navigator.geolocation) {
        await new Promise<void>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              getLocation(latitude, longitude);
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
      
      
    }
  };

  const loadMap = async () => {
    try {
      setLoading(true);
  
      if (navigator.geolocation) {
        await new Promise<void>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              getLocation(latitude, longitude);
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

  const stopIcon = (index: number) => new DivIcon({
    className: 'custom-icon',
    html: `<div style="width: 60px; height: 60px; background-color: #d51507; border-radius: 60px 60px 0px 60px; position: relative; transform: rotate(45deg); display: flex; justify-content: center; align-items: center;">
              <div style="width: 80%; height: 80%; border-radius: 50%; transform: rotate(-45deg); object-fit: cover; background-color: #000000; display: flex; justify-content: center; align-items: center; text-align: center; color:#FFFFFF;">
                <h1 style="font-size: 30px; margin: 0;">${index}</h1>
              </div>
          </div>`,
    iconSize: [60, 60],
  });
  
  
  return (
    <>
    

    {/* loading component */}
    {loading && <FullLoadScreen loadingTime={2}/>}

      {/* <div className='absolute z-40 mt-20 ml-3' >
        <div className='w-[100%] h-fill flex flex-col border-2 bg-[#F1FCFD] rounded-lg'>
          <div className=''>
            <div className='map'>
              {(userLocation || errorFetchingLocation) && (
                <MapContainer

                  center={userLocation ? locationToLatLngExpression(userLocation) : [0, 0]}
                  zoom={userLocation ? 15 : 0}
                  scrollWheelZoom={true}
                  style={{ height: '85vh', width: '65vw', backgroundColor: '#4D6DE3' }}
                  zoomControl={true} // Disable zoom control
                > */}
                  {/* Base Map Layer */}

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

                  <MapClickHandler  onMapClick={handleMapClick} />
                  

                  {markers.map((marker, index) => (
                    <Marker
                      key={index}
                      position={locationToLatLngExpression(marker)}
                      icon={stopIcon(index+1)}
                    >
                    
                      {/* <Popup> */}
                        {/* {tripRouteMarkers[index].address} */}
                      {/* </Popup> */}
                      </Marker>
                  ))}
                  {/* <RoutingMachine key={refreshKey} array={tripRouteMarkers} /> */}
                  
                  {/* Display an alternative map or message in case of an error fetching user location */}
                  {!userLocation && errorFetchingLocation && (
                    <div style={{ height: '5vh', width: '100vw', backgroundColor: 'red', color: 'white', textAlign: 'center', position: 'absolute', zIndex: '10000' }}>
                      <p>Error fetching user location. Please allow location access to use this feature.</p>
                      {/* You can add more styling or information as needed */}
                    </div>
                  )}
                  
                </MapContainer>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=' absolute z-30 mt-2 ml-1 bg-[#F1FCFD] rounded-lg'>
        <img src={CurrentLocationIcon} width={'40px'} onClick={handleButtonClick}/>
      </div>
    </>
  );
}

function MapClickHandler({ onMapClick }: { onMapClick: (event: any) => void }) {
  const map = useMapEvents({
    click: onMapClick,
  });

  console.log(map);
  return null;
}

export default MapView;
