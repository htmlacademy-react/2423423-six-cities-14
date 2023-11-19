import { IPlaces } from '../../interfaces/IPlaces';
import Card from '../card/Card';
import { api } from '../../store';
import { useEffect } from 'react';
type TPlacesProps = {
  places: IPlaces[];
  onListItemHover: (listItemName: string | undefined) => void;
};

export default function List({ places, onListItemHover }: TPlacesProps) {
  const url = '/six-cities/offers';
  useEffect(() => {
    api({
      method: 'get',
      url: url,
    });
  }, []);

  return (
    <div className="cities__places-list places__list tabs__content">
      {places.map((place) => (
        <Card key={place.id} place={place} onListItemHover={onListItemHover} />
      ))}
    </div>
  );
}
