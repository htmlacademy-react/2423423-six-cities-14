import List from '../components/CardList/List';
import Map from '../components/Map/Map';
import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Tabs from '../components/Tabs/Tabs';
import FilterOffer from '../components/OfferSorting/OfferSorting';
import { useAppDispatch, useAppSelector } from '../types/store';
import { OfferApi } from '../types/offer';
import Spinner from '../components/Spinner/Spinner';
import { MainEmpty } from './MainEmpty';
import { store } from '../store';
import { fetchFavorites, fetchOffersAction } from '../store/api-actions';
import { DEFAULT_LOCATION, LOCATIONS_NAME } from '../consts/consts';
import { useLocation, useNavigate } from 'react-router-dom';
import { offerSlice } from '../store/slices/offer';
import classNames from 'classnames';
store.dispatch(fetchOffersAction());
store.dispatch(fetchFavorites());

export default function Main() {
  const dispatch = useAppDispatch();
  const location = useLocation().pathname.slice(1);
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
  const navigate = useNavigate();
  useEffect(() => {
    if (activeCityName !== location && LOCATIONS_NAME.includes(location)) {
      dispatch(offerSlice.actions.changedCity(location));
    }
    if (!location || !LOCATIONS_NAME.includes(location)) {
      dispatch(offerSlice.actions.changedCity(location));
      navigate(`/${DEFAULT_LOCATION}`);
    }
  }, [activeCityName, navigate, location, dispatch]);
  const mainPageClass = classNames('page__main', 'page__main--index', {
    'page__main--index-empty': findPlacesCityData.length <= 0,
  });
  if (!cityData || !sortingPlacesData) {
    return <Spinner />;
  }
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={mainPageClass}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {LOCATIONS_NAME.map((localCity) => (
                <Tabs key={localCity} city={localCity} />
              ))}
            </ul>
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <FilterOffer isActiveCity={cityData} />

              {findPlacesCityData.length > 0 ? (
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
