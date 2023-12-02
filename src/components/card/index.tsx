import { Link } from 'react-router-dom';
import { OfferApi } from '../../types/offer';
import FavoriteButton from '../favorite-button';
import { getRating } from '../../store/slices/selectors';
import classNames from 'classnames';
import { AppRoute } from '../../consts/route';

type CardProps = {
  offer: OfferApi;
  onCardHover?: (offerId: string | null) => void;
  isMainPage?: boolean;
  isFavoritesPage?: boolean;
  isOfferPage?: boolean;
};

export default function Card({
  offer,
  onCardHover,
  isMainPage = true,
  isFavoritesPage,
  isOfferPage,
}: CardProps) {
  const isPremium = 'Premium';
  const ratingPrecentage = getRating(offer.rating);

  const cardClass = classNames('place-card', {
    'cities__card': isMainPage,
    'favorites__card': isFavoritesPage,
    'near-places__card': isOfferPage,
  });

  const imageWrapperClass = classNames('place-card__image-wrapper', {
    'cities__image-wrapper': isMainPage,
    'favorites__image-wrapper': isFavoritesPage,
  });
  function handleMouseEnter() {
    onCardHover?.(offer.id);
  }

  function handleMouseLeave() {
    onCardHover?.(null);
  }

  return (
    <article
      className={cardClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={offer.isPremium ? 'place-card__mark' : ''}>
        <span>{offer.isPremium && isPremium}</span>
      </div>

      <div className={imageWrapperClass}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={isFavoritesPage ? 150 : 260}
            height={isFavoritesPage ? 110 : 200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{`€${offer.price}`}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton offerId={offer.id} isFavorite={offer.isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingPrecentage}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{`${offer.type[0].toUpperCase()}${offer.type.slice(1)}`}</p>
      </div>
    </article>
  );
}
