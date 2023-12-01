import Logo from '../Logo/Logo';
import UserNav from '../UserNavigation/UserNav';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <UserNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
