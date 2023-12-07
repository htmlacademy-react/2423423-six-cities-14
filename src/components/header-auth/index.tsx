import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts/route';
import {
  fetchFavorites,
  getCurrentUserData,
  logoutAction,
} from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../types/store';
import { useEffect } from 'react';
import { AuthorizationStatus } from '../../consts/consts';
import { offerSlice } from '../../store/slices/offer';
import { userSlice } from '../../store/slices/user';


function HeaderAuth() {
  const userInfo = useAppSelector((state) => state.user.userData);
  const favoriteOffers = useAppSelector((state) => state.offers.favoriteOffers);
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavorites());
    }
    dispatch(getCurrentUserData());
  }, [dispatch]);

  return (
    <>
      <li className="header__nav-item user" data-testid="auth">
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
          <span className="header__user-name user__name">{userInfo?.email}</span>
          <span className="header__favorite-count">
            {favoriteOffers.length}
          </span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          to={AppRoute.Root}
          className="header__nav-link"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
            dispatch(offerSlice.actions.resetFavoriteOffer([]));
            dispatch(userSlice.actions.resetUserData(null));
          }}
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}

export default HeaderAuth;
