"use client"; // If using Next.js App Router

import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 43.4750141,
  lng: -80.5295119,
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
    name: "Engineering 7 (E7)",
    position: { lat: 43.4729, lng: -80.5395 },
    icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    description: "200 University Ave W, Waterloo, ON N2L 3G5",

  },
  {
    id: 2,
    name: "Mathimatics 3 (M3)",
    position: { lat: 43.4732, lng: -80.5440 },
    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    description: "200 University Ave W, Waterloo, ON N2L 0A4 \nfloor 4",
  },
  {
    id: 3,
    name: "Physical Activities Complex (PAC)",
    position: { lat: 43.4728, lng: -80.5460 },
    icon: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    description: "200 University Ave W, Waterloo, ON N2L 3G3",
  },
  {
    id: 4,
    name: "Columbia Icefield (CIF)",
    position: { lat: 43.4755, lng: -80.5485 },
    icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    description: "220 Columbia St W, Waterloo, ON N2L 6R5",
  },
  {
    id: 5,
    name: "University of Waterloo | Faculty of Health｜EXP",
    position: { lat: 43.4728, lng: -80.5400 },
    icon: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
    description: "200 University Ave W, Waterloo, ON N2L 3G5",
  },
  {
    id: 6,
    name: "Chemistry 2",
    position: { lat: 43.4720, lng: -80.5430 },
    icon: "https://maps.google.com/mapfiles/ms/icons/pink-dot.png",
    description: "Waterloo, ON N2L 3G1",
  },
  {
    id: 7,
    name: "Earth Sciences and Chemistry",
    position: { lat: 43.4714, lng: -80.5427 },
    icon: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png",
    description: "200 University Ave W, Waterloo, ON N2L 3G1",
  },
];

export default function GoogleMapsComponent() {
  const [mapCenter, setMapCenter] = useState(center);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  // Function to find the nearest POI
  const findNearestPOI = async (location: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const userLocation = data.results[0].geometry.location;
        console.log("User Location:", userLocation);

        let closestPlace = places[0];
        let minDistance = Number.MAX_VALUE;

        places.forEach((place) => {
          const distance = Math.sqrt(
            Math.pow(place.position.lat - userLocation.lat, 2) +
              Math.pow(place.position.lng - userLocation.lng, 2)
          );
          if (distance < minDistance) {
            minDistance = distance;
            closestPlace = place;
          }
        });

        console.log("Closest POI:", closestPlace);

        // Update map center and highlight nearest POI
        setMapCenter(closestPlace.position);
        setSelectedPlace(closestPlace);
      } else {
        alert("Location not found. Try again!");
      }
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };

  return (
    <div className="relative w-full max-w-3xl">
      {/* Search Bar - Placed Above the Map */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-3/4 flex">
        <input
          type="text"
          placeholder="Enter location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-l w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          onClick={() => findNearestPOI(searchQuery)}
          className="bg-teal-500 text-white px-4 py-2 rounded-r hover:bg-teal-600"
        >
          Search
        </button>
      </div>

      {/* Google Map */}
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={13}>
          {places.map((place) => (
            <Marker key={place.id} position={place.position} icon={place.icon} onClick={() => setSelectedPlace(place)} />
          ))}

          {selectedPlace && (
            <InfoWindow position={selectedPlace.position} onCloseClick={() => setSelectedPlace(null)}>
              <div>
                <h2 className="text-lg text-gray-800 font-bold">{selectedPlace.name}</h2>
                <p className="text-sm text-gray-600">{selectedPlace.description}</p>
                <p className="text-sm text-gray-400">
                  Coordinates: {selectedPlace.position.lat}, {selectedPlace.position.lng}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
