import { IPlaces } from '../../interfaces/IPlaces';
import leaflet from 'leaflet';
import React, { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { ICity } from '../../interfaces/ICity';

type TCityProps = {
  city: ICity;
  places:IPlaces[];
};

export default function Map({ city, places }: TCityProps) {
  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });

  useEffect(() => {
    if (map) {
      places.forEach((place) => {
        leaflet
          .marker({
            lat: place.lat,
            lng: place.lng,
          })
          .addTo(map);
      });
    }
  }, [map, places]);

  return <div style={{ height: '794px', width:'100%' }} ref={mapRef}></div>;
}
