import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Map from '../components/map';
import { useAppDispatch, useAppSelector } from '../types/store';
import { OfferApi } from '../types/offer';
import {
  fetchCurrenfOffer,
  fetchOfferComments,
  fetchOffersNearby,
} from '../store/api-actions';

import { AppRoute } from '../consts/route';
import FavoriteButton from '../components/favorite-button';
import Host from '../components/offer-host';
import UserNav from '../components/user-navigation';
import Logo from '../components/logo';
import { Helmet } from 'react-helmet-async';
import {
  getCurrentComments,
  getCurrentOffer,
  getNearbyOffers,
  getRating,
} from '../store/slices/selectors';
import {
  LoadingStatus,
  MAX_OFFER_IMAGES_COUNT,
  NEARBY_COUNT,
} from '../consts/consts';
import OfferImage from '../components/offer-image';
import OfferReviewList from '../components/offer-review-list';
import Card from '../components/card';
import Spinner from '../components/spinner';

export default function Offer() {
  const dispatch = useAppDispatch();
  const offerId = useParams().id;
  const currentOffer = useAppSelector(getCurrentOffer);
  const currentComments = useAppSelector(getCurrentComments);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const nearbyToShow = nearbyOffers.slice(0, NEARBY_COUNT);
  const loadingStatus = useAppSelector(
    (state) => state.offers.isCurrentOfferDataLoading
  );

  useEffect(() => {
    if (offerId) {
      dispatch(fetchCurrenfOffer(offerId));
      dispatch(fetchOfferComments(offerId));
      dispatch(fetchOffersNearby(offerId));
    }
  }, [offerId, dispatch]);

  if (!currentOffer || loadingStatus !== LoadingStatus.Fulfilled) {
    return loadingStatus === LoadingStatus.Rejected ? (
      <Navigate to={AppRoute.NotFound} />
    ) : (
      <Spinner />
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer</title>
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
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images
                .slice(0, MAX_OFFER_IMAGES_COUNT)
                .map((image: string) => (
                  <OfferImage
                    image={image}
                    key={`${currentOffer.id}${image}`}
                  />
                ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className={currentOffer.isPremium ? 'offer__mark' : ''}>
                <span>{currentOffer.isPremium && 'Premium'}</span>
              </div>

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <FavoriteButton
                  offerId={currentOffer.id}
                  offer={currentOffer}
                  isPlaceCard={false}
                  isOfferCard
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${getRating(currentOffer.rating)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {`${currentOffer.type[0].toUpperCase()}${currentOffer.type.slice(
                    1
                  )}`}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">{`€${currentOffer.price}`}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <Host currentOffer={currentOffer} />
              <OfferReviewList comments={currentComments} id={offerId} />
            </div>
          </div>
          <section className="offer__map map ">
            <div className="custom__map">
              <Map
                key={currentOffer.id}
                location={currentOffer.city.location}
                offers={[currentOffer, ...nearbyToShow]}
                specialOfferId={currentOffer.id}
                isOfferPage
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
              {nearbyToShow.map((offer: OfferApi) => (
                <Card
                  offer={offer}
                  key={offer.id}
                  isMainPage={false}
                  isOfferPage
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
