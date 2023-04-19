import React from "react";
//import { useMemo } from 'react';
//import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
const Atm = () => {
    return (
        <div>
            <h1>Atm Locator</h1>
        </div>
    );
};
export default Atm;


/* Google Maps
export default function Home(){
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  if(!isLoaded) return <div> Loading...</div>;
  return <Map />;
}
  function Map(){
    const center =useMemo(() => ({lat:44,lng:-80}),[]);
    return(<GoogleMap zoom ={10} center ={center} mapContainerClassName="map-container">
    <Marker position={center} />
  </GoogleMap>
  );
}
*/