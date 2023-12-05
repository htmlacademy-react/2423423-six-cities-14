import { useEffect } from 'react';
import Tabs from '../components/tabs';
import { useAppDispatch, useAppSelector } from '../types/store';
import { OfferApi } from '../types/offer';
import Spinner from '../components/spinner';
import { MainEmpty } from './MainEmpty';
import { fetchOffers } from '../store/api-actions';
import { DEFAULT_LOCATION } from '../consts/consts';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Logo from '../components/logo';
import UserNav from '../components/user-navigation';
import CityCards from '../components/city-cards';
import { getSortingOption } from '../store/slices/selectors';
import { citySlice } from '../store/slices/city';
import { store } from '../store';
// import { AppRoute } from '../consts/route';

store.dispatch(fetchOffers());

export default function Main(): JSX.Element {
  const navigate = useNavigate();
  const currentSortOption = useAppSelector(getSortingOption);
  const offersList = useAppSelector((state) => state.offers.offers);
  const currentCity = useAppSelector((state) => state.city.city);

  // const error = useAppSelector((state) => state.offers.error);

  const currentCityOffers: OfferApi[] = offersList.filter((offer) => offer.city.name === currentCity);

  const dispatch = useAppDispatch();
  const location = useLocation().pathname.slice(1);
  const isOffersDataLoading = useAppSelector(
    (state) => state.offers.isOffersDataLoading
  );

  useEffect(() => {
    dispatch(citySlice.actions.changeCity(location));
  }, [location, dispatch]);

  useEffect(() => {
    if (!location) {
      navigate(`${DEFAULT_LOCATION}`);
    }
  }, [navigate, location]);

  const sortingVariants: { [key: string]: OfferApi[] } = {
    Popular: currentCityOffers,
    'Price: low to high': [...currentCityOffers].sort(
      (a, b) => a.price - b.price
    ),
    'Price: high to low': [...currentCityOffers].sort(
      (a, b) => b.price - a.price
    ),
    'Top rated first': [...currentCityOffers].sort(
      (a, b) => b.rating - a.rating
    ),
  };

  const sortedOffers = sortingVariants[currentSortOption];

  const mainPageClass = classNames('page__main', 'page__main--index', {
    'page__main--index-empty': !currentCityOffers.length,
  });

  if (!isOffersDataLoading) {
    return <Spinner />;
  }

  // if(error !== null){
  //   return <Navigate to={AppRoute.NotFound} />;
  // }
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      <main className={mainPageClass}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <Tabs />
          </section>
        </div>

        <div className="cities">
          {currentCityOffers.length > 0 ? (
            <CityCards offers={sortedOffers} />
          ) : (
            <MainEmpty location={location} />
          )}
        </div>
      </main>
    </div>
  );
}
