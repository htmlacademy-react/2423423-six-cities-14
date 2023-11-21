import List from '../List/List';
import { city } from '../../mock/City';
import Map from '../Map/Map';
import { useState } from 'react';
import Header from '../Header/Header';
import Tabs from '../Tabs/Tabs';
import FilterOffer from '../FilterOffer/FilterOffer';
import { useAppSelector } from '../../interfaces/IStore';
import { OfferApi } from '../../types/offer';

export default function Main() {
  //получить активный город и список его предложений
  const activeCityName = useAppSelector((state) => state.city);
  const fullOffers = useAppSelector((state) => state.offers);
  const cityData = city.find((item) => item.name === activeCityName);

  //определяю данные предложений активного города для передачи в карту
  const findPlacesCityData = fullOffers.filter(
    (item) => item.city.name === activeCityName
  );

  //определение id сортировки и применение соответствующего фильтра
  const activeFilterCategory = useAppSelector((state) => state.filter.id);
  const switchFilter = (itemA: OfferApi, itemB: OfferApi) => {
    switch (activeFilterCategory) {
      case 'lth':
        return itemA.price - itemB.price;

      case 'htl':
        return itemB.price - itemA.price;

      case 'top':
        return itemB.rating - itemA.rating;

      default:
        return 0;
    }
  };
  const sortingPlacesData = findPlacesCityData.sort(switchFilter);

  //определение на какое предложение пользователь навел мышь
  const [selectedPoint, setSelectedPoint] = useState<OfferApi | undefined>(
    undefined
  );
  const handleListItemHover = (listItemName: string | undefined) => {
    const currentPoint = findPlacesCityData.find(
      (point) => point.id === listItemName
    );
    setSelectedPoint(currentPoint);
  };

  if (!cityData || !sortingPlacesData) {
    return false;
  }
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <Tabs />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <FilterOffer isActiveCity={cityData} />

              <List
                places={sortingPlacesData}
                onListItemHover={handleListItemHover}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map ">
                <Map
                  key={cityData.name}
                  city={cityData}
                  places={findPlacesCityData}
                  selectedPoint={selectedPoint}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
