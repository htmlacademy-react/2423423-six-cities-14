import { NavLink } from 'react-router-dom';
import { LOCATIONS_NAME } from '../../consts/consts';
import { OfferApi } from '../../types/offer';
import { AppRoute } from '../../consts/route';
import Card from '../card';

type FavoritesListProps = {
  favoriteOffers: OfferApi[];
};
function FavoriteList({ favoriteOffers }: FavoritesListProps) {
  const filterLocation = LOCATIONS_NAME.filter((location) =>
    favoriteOffers.map((item) => item.city.name).includes(location)
  );
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {filterLocation.map((locationName) => (
              <li className="favorites__locations-items" key={locationName}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <NavLink
                      to={`${AppRoute.Root}${locationName}`}
                      className="locations__item-link"
                    >
                      <span>{locationName}</span>
                    </NavLink>
                  </div>
                </div>

                <div className="favorites__places">
                  {favoriteOffers
                    .filter(
                      (cityNameOffer) =>
                        cityNameOffer.city.name === locationName
                    )
                    .map((offerData) => (
                      <Card
                        offer={offerData}
                        key={offerData.id}
                        isMainPage={false}
                        isFavoritesPage
                      />
                    ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoriteList;
