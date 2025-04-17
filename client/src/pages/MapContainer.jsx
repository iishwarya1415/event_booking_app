import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MapContainer = ({ address }) => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const response = await axios.get(
          'https://maps.googleapis.com/maps/api/geocode/json',
          {
            params: {
              address,
              key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            },
          }
        );

        const location = response.data.results[0]?.geometry?.location;
        if (location) {
          setCoordinates(location);
        } else {
          console.error("Address not found");
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    };

    if (address) getCoordinates();
  }, [address]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates || { lat: 0, lng: 0 }}
        zoom={coordinates ? 15 : 2}
      >
        {coordinates && <Marker position={coordinates} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
