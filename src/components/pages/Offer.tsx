import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Reviews from '../formReviews/Reviews';
import Header from '../Header/Header';
import Map from '../Map/Map';
import List from '../List/List';
import { useAppSelector } from '../../interfaces/IStore';
import { OfferApi } from '../../types/offer';
import { store } from '../../store';
import { fetchOfferAction, fetchOffersNearby } from '../../store/api-actions';
import Spinner from '../Spinner/Spinner';

export default function Offer() {

  const params = useParams();
  const offerId = params.id;

  useEffect(() => {
    if (offerId) {
      store.dispatch(fetchOfferAction(offerId));
      store.dispatch(fetchOffersNearby(offerId));
    }
  }, [offerId]);
  //получение активного города,получение текущего предложения по айди,получение предложений рядом
  // const activeCityName = useAppSelector((state) => state.city);
  const infoOffer = useAppSelector((state) => state.activeOffer);
  const infoOfferNearby = (useAppSelector((state) => state.offerNearby)).slice(0,10);

  // маркеры
  const [selectedPoint, setSelectedPoint] = useState<OfferApi | undefined>(
    undefined
  );
  const handleListItemHover = (listItemName: string | undefined) => {
    const currentPoint = infoOfferNearby.find(
      (point) => point.id === listItemName
    );
    setSelectedPoint(currentPoint);
  };

  if (!infoOffer || !infoOfferNearby) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {infoOffer.images.map((item) => (
                <div key={item} className="offer__image-wrapper">
                  <img className="offer__image" src={item} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {infoOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{infoOffer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {infoOffer.isFavorite === false
                      ? 'To bookmark'
                      : 'In bookmark'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: (infoOffer.rating * 100) / 5 }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">4.8</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {infoOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {infoOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {infoOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{infoOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {infoOffer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={infoOffer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {infoOffer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {infoOffer.host.isPro && 'Pro'}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by
                    the unique lightness of Amsterdam. The building is green and
                    from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand
                    Square and National Opera, but where the bustle of the city
                    comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <Reviews />
            </div>
          </div>
          <section className="offer__map map ">
            <div className="custom__map">
              <Map
                key={infoOffer.city.name}
                city={infoOffer}
                places={infoOfferNearby}
                selectedPoint={selectedPoint}
                size="600px"
              />
            </div>
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <List
                places={infoOfferNearby}
                onListItemHover={handleListItemHover}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
