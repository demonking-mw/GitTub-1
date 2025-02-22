"use client"; // If using Next.js App Router

import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 43.4750141, // Default Latitude (WLU)
  lng: -80.5295119, // Default Longitude
};

type Place = {
    id: number;
    name: string;
    position: { lat: number; lng: number };
    icon: string;
    description: string;
  };

const places: Place[] = [
    {
      id: 1,
      name: "University of Waterloo",
      position: { lat: 43.4728, lng: -80.5400 },
      icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
      description: "Shower maybe"
    },
    {
      id: 2,
      name: "University of Waterloo but elsewhere",
      position: { lat: 43.4720, lng: -80.5440 },
      icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      description: "Engineers need to shower"
    },
  ];

export default function GoogleMapsComponent() {
  const [mapCenter, setMapCenter] = useState(center);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={10}>
        {places.map((place) => (
          <Marker key={place.id} position={place.position} icon={place.icon} onClick={() => setSelectedPlace(place)} />
        ))}
        {selectedPlace && (
          <InfoWindow
            position={selectedPlace.position}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h2 className="text-lg text-gray-800 font-bold">{selectedPlace.name}</h2>
              <p className="text-sm text-gray-600"> {selectedPlace.description}</p>
              <p className="text-sm text-gray-400"> Coordinates: {selectedPlace.position.lat}, {selectedPlace.position.lng}</p>    
            </div>
          </InfoWindow>
        )}
        <Marker position={mapCenter} />
      </GoogleMap>
    </LoadScript>
  );
}