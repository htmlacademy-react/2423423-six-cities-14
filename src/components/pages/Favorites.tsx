import { store } from '../../store';
import { fetchFavorites } from '../../store/api-actions';
import { useAppSelector } from '../../types/store';
import Header from '../Header/Header';
import { useEffect } from 'react';

export default function Favorites() {

  useEffect(() => {
    store.dispatch(fetchFavorites());
  }, []);
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteOffers.map((item) => (
                <div key={item.city.name}>
                  <li className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{item.city.name}</span>
                        </a>
                      </div>
                    </div>
                  </li>
                  <div className="favorites__places">
                    {favoriteOffers.map((favor) => (
                      <article
                        key={favor.id}
                        className="favorites__card place-card"
                      >
                        {favor.isPremium && (
                          <div className="place-card__mark">
                            <span>Premium</span>
                          </div>
                        )}

                        <div className="favorites__image-wrapper place-card__image-wrapper">
                          <a href="#">
                            <img
                              className="place-card__image"
                              src={favor.previewImage}
                              width="150"
                              height="110"
                              alt="Place image"
                            />
                          </a>
                        </div>
                        <div className="favorites__card-info place-card__info">
                          <div className="place-card__price-wrapper">
                            <div className="place-card__price">
                              <b className="place-card__price-value">
                                &euro;{favor.price}
                              </b>
                              <span className="place-card__price-text">
                                &#47;&nbsp;night
                              </span>
                            </div>
                            <button
                              className="place-card__bookmark-button place-card__bookmark-button--active button"
                              type="button"
                            >
                              <svg
                                className="place-card__bookmark-icon"
                                width="18"
                                height="19"
                              >
                                <use xlinkHref="#icon-bookmark"></use>
                              </svg>
                              <span className="visually-hidden">
                                {favor.isFavorite === false
                                  ? 'To bookmark'
                                  : 'In bookmark'}
                              </span>
                            </button>
                          </div>
                          <div className="place-card__rating rating">
                            <div className="place-card__stars rating__stars">
                              <span style={{ width: (favor.rating * 100) / 5 }}></span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <h2 className="place-card__name">
                            <a href="#">{favor.title}</a>
                          </h2>
                          <p className="place-card__type">{favor.type}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}
