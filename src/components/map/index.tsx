import {Icon, Marker, layerGroup} from 'leaflet';
import { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { OfferApi } from '../../types/offer';
import classNames from 'classnames';
import { Location } from '../../types/location';

type TCityProps = {
  location: Location;
  offers: OfferApi[];
  specialOfferId: string | null;
  isOfferPage?: boolean;
  isMainPage?: boolean;
};

type IconConfig = {
  url: string;
  width: number;
  height: number;
  anchorX: number;
  anchorY: number;
};

const defaultIconConfig: IconConfig = {
  url: 'img/pin.svg',
  width: 27,
  height: 39,
  anchorX: 13.5,
  anchorY: 40,
};

const activeIconConfig: IconConfig = {
  url: 'img/pin-active.svg',
  width: 27,
  height: 39,
  anchorX: 13.5,
  anchorY: 40,
};

function createIcon(config: IconConfig) {
  return new Icon({
    iconUrl: config.url,
    iconSize: [config.width, config.height],
    iconAnchor: [config.anchorX, config.anchorY],
  });
}

export default function Map(props: TCityProps): JSX.Element {
  const { location, offers, specialOfferId, isMainPage, isOfferPage } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  const mapClass = classNames('map', {
    'cities__map': isMainPage,
    'offer__map': isOfferPage,
  });

  useEffect(() => {
    if (map) {
      map.setView(
        [location.latitude, location.longitude],
        location.zoom
      );
    }
  }, [map, location]);

  useEffect(() => {
    if (map) {
      map.scrollWheelZoom.disable();
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer: OfferApi) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        marker
          .setIcon(
            offer.id === specialOfferId
              ? createIcon(activeIconConfig)
              : createIcon(defaultIconConfig)
          )
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, location, offers, specialOfferId]);

  return <section className={mapClass} ref={mapRef}></section>;
}
