"use client"; // If using Next.js App Router

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749, // Default Latitude (e.g., San Francisco)
  lng: -122.4194, // Default Longitude
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