import { AuthorizationStatus } from '../../consts/consts';
import { store } from '../../store';
import { useAppDispatch, useAppSelector } from '../../types/store';
import { fetchUserData, logoutAction } from '../../store/api-actions';
import { AppRoute } from '../../consts/route';
import { Link } from 'react-router-dom';

store.dispatch(fetchUserData());

function UserNav() {
  const userInfo = useAppSelector((state) => state.user.userData);
  const favoriteOffers = useAppSelector(
    (state) => state.favorites.favoriteOffers
  );
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(logoutAction());
  };
  return authorizationStatus === AuthorizationStatus.Auth ? (
    <nav className="header__nav">
      <ul className="header__nav-list">
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
            <span className="header__user-name user__name">
              {userInfo?.name}
            </span>
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
      </ul>
    </nav>
  ) : (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={AppRoute.Login}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;
