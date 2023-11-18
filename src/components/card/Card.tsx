import { IPlaces } from '../../interfaces/IPlaces';
import { Link } from 'react-router-dom';

type TPlacesProps = {
  place: IPlaces;
  onListItemHover: (listItemName: string | undefined) => void;
};

export default function Card({
  place,
  onListItemHover,
}: TPlacesProps) {
  const handleListItemHover = (name: string | undefined) => {
    onListItemHover(name);
  };

  return (
    <Link to={`/offer/${place.id}`}>
      <article
        className="cities__card place-card"
        onMouseOver={() => handleListItemHover(place.name)}
        onMouseOut={() => handleListItemHover(undefined)}
      >
        {place.mark && (
          <div className="place-card__mark">
            <span>{place.mark}</span>
          </div>
        )}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <img
            className="place-card__image"
            src={place.imgUrl}
            width="260"
            height="200"
            alt="Place image"
          />
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{place.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className="place-card__bookmark-button button"
              type="button"
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">
                {place.isBookmarks === false ? 'To bookmark' : 'In bookmark'}
              </span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: place.rating }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">{place.name}</h2>
          <p className="place-card__type">{place.type}</p>
        </div>
      </article>
    </Link>
  );
}
