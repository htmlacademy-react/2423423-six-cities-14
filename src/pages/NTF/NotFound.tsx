import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import { LOCATIONS_NAME } from '../../consts/consts';
import Tabs from '../../components/Tabs/Tabs';
import dino from '../../assets/Dino.png';
import './styles.css';
import { AppRoute } from '../../consts/route';

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
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {LOCATIONS_NAME.map((localCity) => (
                <Tabs key={localCity} city={localCity} />
              ))}
            </ul>
          </section>
        </div>
        <div className=" not-found-page">
          <h1>Page not found </h1>
          <Link to={AppRoute.Root}><p>Go to main page</p></Link>
          <img src={dino} alt="dino photo page not found" width={400} />
        </div>
      </main>
    </div>
  );
}
