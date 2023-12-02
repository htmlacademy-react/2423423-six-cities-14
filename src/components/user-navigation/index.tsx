import { AuthorizationStatus } from '../../consts/consts';
import { useAppSelector } from '../../types/store';
import HeaderAuth from '../header-auth';
import HeaderNoAuth from '../header-no-auth';

type IFavoritesProprs = {
  isFavoritesPage?: boolean;
};
function UserNav({ isFavoritesPage }: IFavoritesProprs) {
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth ? (
          <HeaderAuth isFavoritesPage={isFavoritesPage} />
        ) : (
          <HeaderNoAuth />
        )}
      </ul>
    </nav>
  );
}

export default UserNav;
