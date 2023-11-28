import List from '../CardList/List';
import Map from '../Map/Map';
import { useState } from 'react';
import Header from '../Header/Header';
import Tabs from '../Tabs/Tabs';
import FilterOffer from '../OfferSorting/OfferSorting';
import { useAppSelector } from '../../types/store';
import { OfferApi } from '../../types/offer';
import Spinner from '../Spinner/Spinner';
import { MainEmpty } from './MainEmpty';
import { store } from '../../store';
import { fetchFavorites, fetchOffersAction } from '../../store/api-actions';


store.dispatch(fetchOffersAction());
store.dispatch(fetchFavorites());

export default function Main() {
  //получение активного города и списка всех предложений
  const activeCityName = useAppSelector((state) => state.offers.city);
  const offers = useAppSelector((state) => state.offers.offers);
  //определение данных о городе, для передачи его точек в карту
  const cityData = offers.find((item) => item.city.name === activeCityName);
  //определение данных предложений активного города для передачи в карту
  const findPlacesCityData = offers.filter(
    (item) => item.city.name === activeCityName
  );
  //определение id сортировки и применение соответствующего фильтра
  const activeFilterCategory = useAppSelector((state) => state.offers.filter);
  const switchFilter = (itemA: OfferApi, itemB: OfferApi) => {
    switch (activeFilterCategory.id) {
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
    return <Spinner />;
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

              {findPlacesCityData ? (
                <List
                  places={sortingPlacesData}
                  onListItemHover={handleListItemHover}
                />
              ) : (
                <MainEmpty />
              )}
            </section>
            <div className="cities__right-section">
              <section className="cities__map ">
                <Map
                  key={cityData.city.name}
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
