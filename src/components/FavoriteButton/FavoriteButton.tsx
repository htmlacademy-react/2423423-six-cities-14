import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../types/store';
import { useState } from 'react';
import { OfferApi } from '../../types/offer';
import { AuthorizationStatus } from '../../consts/consts';
import { AppRoute } from '../../consts/route';
import classNames from 'classnames';
import { fetchFavorites, postFavoriteOffer } from '../../store/api-actions';

type TPlacesProps = {
  place: OfferApi;
};

function FavoriteButton({ place }: TPlacesProps) {
  const offerId = place.id;
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );

  const navigate = useNavigate();
  const [isFavoriteCard, setIsFavoriteCard] = useState(place.isFavorite);

  const toogleFavoritesButton = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
      return;
    }
    setIsFavoriteCard(!isFavoriteCard);
    const status = isFavoriteCard ? 0 : 1;
    const favoriteData = {
      offerId,
      status,
    };
    dispatch(postFavoriteOffer(favoriteData))
      .unwrap()
      .then(() => {
        dispatch(fetchFavorites());
      });
  };

  const classNamesList = classNames('place-card__bookmark-button button', {
    ['place-card__bookmark-button--active']: isFavoriteCard,
  });

  return (
    <button
      className={classNamesList}
      type="button"
      onClick={toogleFavoritesButton}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {place.isFavorite === false ? 'To bookmark' : 'In bookmark'}
      </span>
    </button>
  );
}

export default FavoriteButton;
