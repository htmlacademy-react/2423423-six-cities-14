import { AuthorizationStatus } from '../../consts/consts';
import { useAppSelector } from '../../types/store';
import HeaderAuth from '../header-auth';
import HeaderNoAuth from '../header-no-auth';


function UserNav() {
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );

  return (
    <nav className="header__nav" data-testid='user navigation'>
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth ? (
          <HeaderAuth />
        ) : (
          <HeaderNoAuth />
        )}
      </ul>
    </nav>
  );
}

export default UserNav;
