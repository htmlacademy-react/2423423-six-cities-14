import { CITIES_MAP } from '../../consts/consts';
import { OfferApi } from '../../types/offer';
import { useAppSelector } from '../../types/store';
import Map from '../map';
import OfferSorting from '../offer-sort';
import Card from '../card';
import { useState } from 'react';

type TPlacesProps = {
  offers: OfferApi[];
};

export default function CityCards({ offers }: TPlacesProps) {
  const activeCityName = useAppSelector((store) => store.city.city);

  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);
  function handleCardHover(offerId: string | null) {
    setHoveredOfferId(offerId);
  }
  const cityLocation = CITIES_MAP.find((city) => city.name === activeCityName)?.location;
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} {offers.length === 1 ? 'place' : 'places'} to stay in {activeCityName}
        </b>
        <OfferSorting />

        <div className="cities__places-list places__list tabs__content">
          {offers.map((offer: OfferApi) => (
            <Card offer={offer} onCardHover={handleCardHover} key={offer.id} />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        {cityLocation && (
          <Map
            offers={offers}
            location={cityLocation}
            specialOfferId={hoveredOfferId}
            isMainPage
          />
        )}
      </div>
    </div>
  );
}
