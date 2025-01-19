'use client';

import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const AP_FITNESS_LOCATION = {
  lat: 49.15241,
  lng: -122.89007
};

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  });

  const mapCenter = useMemo(() => AP_FITNESS_LOCATION, []);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [{ "color": "#242f3e" }]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [{ "color": "#242f3e" }]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#746855" }]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#d59563" }]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#d59563" }]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{ "color": "#263c3f" }]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#6b9a76" }]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{ "color": "#38414e" }]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [{ "color": "#212a37" }]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#9ca5b3" }]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{ "color": "#746855" }]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{ "color": "#1f2835" }]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#f3d19c" }]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [{ "color": "#2f3948" }]
        },
        {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#d59563" }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{ "color": "#17263c" }]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#515c6d" }]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [{ "color": "#17263c" }]
        }
      ]
    }),
    []
  );

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ap-red"></div>
      </div>
    );
  }

  return (
    <GoogleMap
      options={mapOptions}
      zoom={15}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={{ width: '100%', height: '100%' }}
    >
      <MarkerF
        position={mapCenter}
        icon={{
          url: '/images/AP-Logo_processed.jpeg',
          scaledSize: new google.maps.Size(40, 40),
        }}
      />
    </GoogleMap>
  );
};

export default Map; 