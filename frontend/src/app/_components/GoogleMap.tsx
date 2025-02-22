"use client"; // If using Next.js App Router

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 43.4750141, // Default Latitude (e.g., WLU)
  lng: -80.5295119, // Default Longitude
};

export default function GoogleMapsComponent() {
  const [mapCenter, setMapCenter] = useState(center);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={10}>
        {/* Example marker */}
        <Marker position={mapCenter} />
      </GoogleMap>
    </LoadScript>
  );
}