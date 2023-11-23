import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../types/store';
import { useState } from 'react';
import { OfferApi } from '../../types/offer';
import { AuthorizationStatus } from '../../consts/consts';
import { AppRoute } from '../../consts/route';
import classNames from 'classnames';
import { toogleFavorites } from '../../store/api-actions';

type TPlacesProps = {
  place: OfferApi;
};

function FavoriteButton({ place }: TPlacesProps) {
  const params = useParams();
  const offerId = params.id;
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(
    (state) => state.statusAuthorization
  );

  const navigate = useNavigate();
  const [isFavoriteCard, setIsFavoriteCard] = useState(place.isFavorite);

  const toogleFavoritesButton = () => {
    if (
      authorizationStatus === AuthorizationStatus.Unknown ||
      authorizationStatus === AuthorizationStatus.NoAuth
    ) {
      navigate(AppRoute.Login);
    }
    setIsFavoriteCard(!isFavoriteCard);
    const status = isFavoriteCard === false ? 0 : 1;
    const favoriteData = {
      offerId,
      status,
    };
    dispatch(toogleFavorites(favoriteData));
  };

  const classNamesList = classNames('place-card__bookmark-button button', {
    ['place-card__bookmark-button--active']: isFavoriteCard,
  });

  return (
    <button className={classNamesList} type="button" onClick={toogleFavoritesButton}>
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
