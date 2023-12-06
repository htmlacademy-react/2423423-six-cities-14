import { useAppSelector } from '../types/store';
import FavoritesEmpty from '../components/favorites-empty';
import Footer from '../components/footer';
import classNames from 'classnames';
import { Helmet } from 'react-helmet-async';
import Logo from '../components/logo';
import UserNav from '../components/user-navigation';
import FavoriteList from '../components/favorite-list';
// import { useEffect } from 'react';
// import { AuthorizationStatus } from '../consts/consts';
import { useNavigate } from 'react-router-dom';
// import { AppRoute } from '../consts/route';



export default function Favorites() {
  const favoriteOffers = useAppSelector((state) => state.offers.favoriteOffers);
  const pageClass = classNames('page', {'page--favorites-empty': favoriteOffers.length <= 0});
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (authStatus !== AuthorizationStatus.Auth) {
  //     navigate(AppRoute.Login);
  //   }
  // }, [authStatus, navigate]);
  return (
    <div className={pageClass}>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
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
      {favoriteOffers.length > 0 ? <FavoriteList favoriteOffers={favoriteOffers} /> : <FavoritesEmpty />}
      <Footer />
    </div>
  );
}
