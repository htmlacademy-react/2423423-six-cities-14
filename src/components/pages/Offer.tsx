import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { placesMock } from '../../mock/Places';
import { IPlaces } from '../../interfaces/IPlaces';
import Reviews from '../formReviews/Reviews';
import Header from '../Header/Header';
import Map from '../Map/Map';
import { city } from '../../mock/City';
import List from '../List/List';
import { ICity } from '../../interfaces/ICity';
import { useAppSelector } from '../../interfaces/IStore';

export default function Offer() {
  const params = useParams();
  const offerId = Number(params.id);
  const [infoOffer, setInfoOffer] = useState<IPlaces>();
  useEffect(() => {
    const foundOffer = placesMock.find((item) => item.id === offerId);
    if (foundOffer) {
      setInfoOffer(foundOffer);
    }
  }, [offerId]);

  const activeCityName = useAppSelector((state) => state.city);

  const [isActiveCityData, setIsActiveCityData] = useState<ICity>();
  useEffect(() => {
    const findCityData = city.find((item) => item.name === activeCityName);
    if (findCityData) {
      setIsActiveCityData(findCityData);
    }
  }, [activeCityName]);

  //поиск предложений рядом, кроме текущего
  const [nearbyOffer, setNearbyOffer] = useState<IPlaces[]>();
  useEffect(() => {
    const foundOffer = placesMock
      .filter((item) => item.location === activeCityName)
      .filter((elem) => elem.id !== offerId);
    if (foundOffer) {
      setNearbyOffer(foundOffer);
    }
  }, [offerId]);

  // маркеры
  const [selectedPoint, setSelectedPoint] = useState<IPlaces | undefined>(
    undefined
  );
  const handleListItemHover = (listItemName: string | undefined) => {
    const currentPoint = nearbyOffer?.find(
      (point) => point.name === listItemName
    );
    setSelectedPoint(currentPoint);
  };

  if (!infoOffer || !nearbyOffer || !isActiveCityData) {
    return false;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/room.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-01.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-02.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-03.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/studio-01.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-01.jpg"
                  alt="Photo studio"
                />
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {infoOffer.mark && (
                <div className="offer__mark">
                  <span>{infoOffer.mark}</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{infoOffer.name}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {infoOffer.isBookmarks}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: infoOffer.rating }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">4.8</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  Apartment
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{infoOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">Wi-Fi</li>
                  <li className="offer__inside-item">Washing machine</li>
                  <li className="offer__inside-item">Towels</li>
                  <li className="offer__inside-item">Heating</li>
                  <li className="offer__inside-item">Coffee machine</li>
                  <li className="offer__inside-item">Baby seat</li>
                  <li className="offer__inside-item">Kitchen</li>
                  <li className="offer__inside-item">Dishwasher</li>
                  <li className="offer__inside-item">Cabel TV</li>
                  <li className="offer__inside-item">Fridge</li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src="img/avatar-angelina.jpg"
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
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
                key={isActiveCityData.name}
                city={isActiveCityData}
                places={nearbyOffer}
                selectedPoint={selectedPoint}
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
                places={nearbyOffer}
                onListItemHover={handleListItemHover}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
