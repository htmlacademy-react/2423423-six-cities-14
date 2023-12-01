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
  size?: string;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});
const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

export default function Map(props: TCityProps): JSX.Element {
  const { city, places, selectedPoint, size } = props;
  const styleMapSize = size ? '600px' : '100vh';
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

  return <section style={{ height: `${styleMapSize}` }} ref={mapRef}></section>;
}
