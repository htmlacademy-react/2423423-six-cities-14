import { IPlaces } from '../../interfaces/IPlaces';
import leaflet from 'leaflet';
import { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { ICity } from '../../interfaces/ICity';
import { Marker, layerGroup } from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../consts/consts';

type TCityProps = {
  city: ICity;
  places: IPlaces[];
  selectedPoint: IPlaces | undefined;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [60, 60],
  iconAnchor: [20, 60],
});
const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [60, 60],
  iconAnchor: [20, 60],
});

export default function Map({ city, places, selectedPoint }: TCityProps) {
  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      places.forEach((place) => {
        const marker = new Marker({
          lat: place.lat,
          lng: place.lng,
        });
        marker
          .setIcon(
            selectedPoint !== undefined && place.name === selectedPoint.name
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, places, selectedPoint]);

  return <div style={{ height: '600px' }} ref={mapRef}></div>;
}
