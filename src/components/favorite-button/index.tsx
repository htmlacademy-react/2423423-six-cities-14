import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../types/store';
import { AuthorizationStatus } from '../../consts/consts';
import { AppRoute } from '../../consts/route';
import classNames from 'classnames';
import { setIsFavorite } from '../../store/api-actions';
import { getAuthStatus } from '../../store/slices/selectors';

type FavoriteButtonProps = {
  offerId: string;
  isFavorite: boolean;
  isPlaceCard?: boolean;
  isOfferCard?: boolean;
};

enum IconSize {
  PlaceCardWidth = 18,
  PlaceCardHeight = 19,
  OfferCardWidth = 31,
  OfferCardHeight = 33,
}

function FavoriteButton({
  offerId,
  isFavorite,
  isPlaceCard = true,
  isOfferCard,
}: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthStatus);

  const iconWidth = isPlaceCard
    ? IconSize.PlaceCardWidth
    : IconSize.OfferCardWidth;
  const iconHeight = isPlaceCard
    ? IconSize.PlaceCardHeight
    : IconSize.OfferCardHeight;

  const favBtnClass = classNames('button', {
    'place-card__bookmark-button--active': isFavorite && isPlaceCard,
    'place-card__bookmark-button': isPlaceCard,
    'offer__bookmark-button--active': isFavorite && isOfferCard,
    'offer__bookmark-button': isOfferCard,
  });

  const favIconClass = classNames({
    'place-card__bookmark-icon': isPlaceCard,
    'offer__bookmark-icon': isOfferCard,
  });

  const handleFavoriteButtonClick = () => {
    if (authStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    }
    if (authStatus === AuthorizationStatus.Auth && isFavorite) {
      dispatch(setIsFavorite({offerId, status: 0}));
    } else {
      dispatch(setIsFavorite({offerId, status: 1}));
    }
  };

  return (
    <button
      className={favBtnClass}
      type="button"
      onClick={handleFavoriteButtonClick}
    >
      <svg className={favIconClass} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {!isFavorite ? 'To bookmark' : 'In bookmark'}
      </span>
    </button>
  );
}

export default FavoriteButton;
