"use client"; // If using Next.js App Router

import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from "@react-google-maps/api";
import { useState } from "react";
import { useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";


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
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [userLocation, setUserLocation] = useState(null);


  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        //setMapCenter(location);
        setSearchedLocation(location);
        findNearestPOI(place.adr_address);
      }
    }
  };
  
  // Get User's Location on Page Load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLoc);
          setMapCenter(userLoc); // Use user's location as default center
          findNearestPOI(userLoc);
        },
        () => {
          console.warn("Geolocation permission denied or unavailable. Using default location.");
        }
      );
    }
  }, []);

  // Find Nearest POI and Get Directions
  const findNearestPOI = (userLoc) => {
    let closestPlace = places[0];
    let minDistance = Number.MAX_VALUE;

    places.forEach((place) => {
      const distance = Math.sqrt(
        Math.pow(place.position.lat - userLoc.lat, 2) +
        Math.pow(place.position.lng - userLoc.lng, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestPlace = place;
      }
    });

    getDirections(userLoc, closestPlace.position);
  };

  // Fetch Directions
  const getDirections = (origin, destination) => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  };
  


  // Handle selection of a place
  const handleSelectSuggestion = async (placeId: string) => {
    try {
      const response = await fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKey}"
      );
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        //setMapCenter(location);
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
    <div className="relative w-full max-w-1xl">
      {/* Search Bar with Autocomplete */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-3/4 flex flex-col bg-white shadow-lg rounded-lg">
      <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
  <input
    type="text"
    placeholder="Enter location..."
    className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
  />
</Autocomplete></LoadScript>
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
  {/* Markers for POIs */}
  {places.map((place) => (
    <Marker key={place.id} position={place.position} icon={place.icon} onClick={() => setSelectedPlace(place)} />
  ))}

  {/* Searched Location Marker */}
  {searchedLocation && <Marker position={searchedLocation} icon={{url: "https://maps.google.com/mapfiles/kml/shapes/man.png", scaledSize: new window.google.maps.Size(40, 40),}} />}

  {/* Directions Renderer */}
  {directions && <DirectionsRenderer options={{ suppressMarkers: true }} directions={directions} />}

  {/* Info Window for Selected POI */}
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