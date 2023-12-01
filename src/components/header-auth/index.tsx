import { Link, Navigate } from 'react-router-dom';
import { AppRoute } from '../../consts/route';
import { store } from '../../store';
import {
  fetchFavorites,
  getCurrentUserData,
  logoutAction,
} from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../types/store';

store.dispatch(getCurrentUserData());
store.dispatch(fetchFavorites());

type IFavoritesProprs = {
  isFavoritesPage?: boolean;
};

function HeaderAuth({ isFavoritesPage }: IFavoritesProprs) {
  const userInfo = useAppSelector((state) => state.user.userData);
  const favoriteOffers = useAppSelector((state) => state.offers.favoriteOffers);

  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(logoutAction());
    if (isFavoritesPage) {
      <Navigate to={AppRoute.Login} />;
    }
  };

  return (
    <>
      <li className="header__nav-item user">
        <Link
          to={AppRoute.Favorites}
          className="header__nav-link header__nav-link--profile"
        >
          <div
            className="header__avatar-wrapper user__avatar-wrapper"
            style={{
              borderRadius: '50px',
              overflow: 'hidden',
            }}
          >
            <img src={userInfo?.avatarUrl} alt="user avatar" />
          </div>
          <span className="header__user-name user__name">{userInfo?.name}</span>
          <span className="header__favorite-count">
            {favoriteOffers.length}
          </span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link to={AppRoute.Root} className="header__nav-link">
          <span className="header__signout" onClick={() => handleClick()}>
            Sign out
          </span>
        </Link>
      </li>
    </>
  );
}

export default HeaderAuth;
