import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Logo from '../../components/logo';
import Tabs from '../../components/tabs';
import dino from '../../assets/Dino.png';
import './styles.css';
import { AppRoute } from '../../consts/route';
import UserNav from '../../components/user-navigation';

export default function NotFound(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities: 404</title>
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
      <main className="page__main page__main--index">
        <div className="tabs">
          <section className="locations container">
            <Tabs />
          </section>
        </div>
        <div className=" not-found-page">
          <span>404</span>
          <h1>Sorry, page not found</h1>
          <Link to={AppRoute.Root}>Back to main page</Link>
          <img src={dino} alt="dino photo page not found" width={400} />
        </div>
      </main>
    </div>
  );
}
