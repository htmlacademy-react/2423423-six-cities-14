import { OfferApi } from '../../types/offer';
import Card from '../card/Card';


type TPlacesProps = {
  places: OfferApi[];
  onListItemHover: (listItemName: string | undefined) => void;
};

export default function List({ places, onListItemHover }: TPlacesProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {places.map((place) => (
        <Card key={place.id} place={place} onListItemHover={onListItemHover} />
      ))}
    </div>
  );
}
