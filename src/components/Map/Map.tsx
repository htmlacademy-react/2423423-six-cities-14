import leaflet from 'leaflet';
import { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { Marker, layerGroup } from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../consts/consts';
import { OfferApi } from '../../types/offer';

type TCityProps = {
  city: OfferApi;
  places: OfferApi[];
  selectedPoint: OfferApi | undefined;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [30, 40],
  iconAnchor: [14, 20],
});
const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [30, 40],
  iconAnchor: [14, 20],
});

export default function Map(props: TCityProps): JSX.Element {
  const {city, places, selectedPoint} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      places.forEach((place) => {
        const marker = new Marker({
          lat: place.location.latitude,
          lng: place.location.longitude,
        });
        marker
          .setIcon(
            selectedPoint !== undefined && place.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, city, places, selectedPoint]);

  return <div style={{ height: '100vh' }} ref={mapRef}></div>;
}
