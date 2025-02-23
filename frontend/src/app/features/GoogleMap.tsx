"use client"; // If using Next.js App Router

import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import { useEffect } from "react";


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

//places, ideally this would be read from a database for better scaling
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
  const [suggestions, setSuggestions] = useState<{ place_id: string; description: string }[]>([]);
  const [searchedLocation, setSearchedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  // Fetch auto-complete suggestions
  const getSuggestions = async (input: string) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
  
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`);
  
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (data.status === "OK") {
        setSuggestions(data.predictions);
      } else {
        console.error("Autocomplete Error:", data.status, data.error_message);
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching autocomplete:", error);
    }
  };

  // Handle selection of a place
  const handleSelectSuggestion = async (placeId: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setMapCenter(location);
        setSearchedLocation(location);
        setSuggestions([]);
        setSearchQuery(data.results[0].formatted_address);
      } else {
        console.error("Geocode Error:", data.status, data.error_message);
      }
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };

  return (
    <div className="relative w-full max-w-3xl">
      {/* Search Bar with Autocomplete */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-3/4 flex flex-col bg-white shadow-lg rounded-lg">
        <input
          type="text"
          placeholder="Enter location..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            getSuggestions(e.target.value); // Ensure getSuggestions is defined here
          }}
          className="border p-2 w-full rounded-t-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border rounded-b-lg shadow-md max-h-40 overflow-auto">
            {suggestions.map((s) => (
              <li
                key={s.place_id}
                onClick={() => handleSelectSuggestion(s.place_id)}
                className="cursor-pointer p-2 hover:bg-teal-100"
              >
                {s.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Google Map */}
      <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={13}>
          {places.map((place) => (
            <Marker key={place.id} position={place.position} icon={place.icon} onClick={() => setSelectedPlace(place)} />
          ))}

          {/* Show searched location marker */}
          {searchedLocation && <Marker position={searchedLocation} icon="https://maps.google.com/mapfiles/ms/icons/green-dot.png" />}

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