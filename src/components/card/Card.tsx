import { Link, useNavigate } from 'react-router-dom';
import { OfferApi } from '../../types/offer';
import { AuthorizationStatus } from '../../consts/consts';
import { useAppSelector } from '../../types/store';
import { AppRoute } from '../../consts/route';
import { useState } from 'react';

type TPlacesProps = {
  place: OfferApi;
  onListItemHover: (listItemName: string | undefined) => void;
};

export default function Card({ place, onListItemHover }: TPlacesProps) {
  const authorizationStatus = useAppSelector(
    (state) => state.statusAuthorization
  );

  const navigate = useNavigate();
  const [isFavoriteCard, setIsFavoriteCard] = useState(place.isFavorite);

  const handleListItemHover = (name: string | undefined) => {
    onListItemHover(name);
  };

  const toogleFavorites = () => {
    if (
      authorizationStatus === AuthorizationStatus.Unknown ||
      authorizationStatus === AuthorizationStatus.NoAuth
    ) {
      navigate(AppRoute.Login);
    }
    setIsFavoriteCard(!isFavoriteCard);
    // const isFavorite = isFavoriteCard === false ? 0 : 1;
    // const favoriteData = {
    //   id,
    //   isFavorite,
    // };
    // dispatch(toogleFavorites(favoriteData));
  };


  return (
    <article
      className="cities__card place-card"
      onMouseOver={() => handleListItemHover(place.id)}
      onMouseOut={() => handleListItemHover(undefined)}
    >
      {place.isPremium === true && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${place.id}`}>
          <img
            className="place-card__image"
            src={place.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button" onClick={toogleFavorites}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden" >
              {place.isFavorite === false ? 'To bookmark' : 'In bookmark'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: (place.rating * 100) / 5 }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">{place.title}</h2>
        <p className="place-card__type">{place.type}</p>
      </div>
    </article>
  );
}
