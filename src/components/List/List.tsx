import { IPlaces } from '../../interfaces/IPlaces';
import Card from '../card/Card';
import { useState} from 'react';

type TPlacesProps = {
  places: IPlaces[];
  onListItemHover: (listItemName: string | undefined) => void;
};

export default function List({ places, onListItemHover }: TPlacesProps) {
  const [isActiveCard, setIsActivCard] = useState<number>();

  return (
    <div className="cities__places-list places__list tabs__content">
      {places.map((place) => (
        <Card
          key={place.id}
          place={place}
          getActiveCard={setIsActivCard}
          onListItemHover={onListItemHover}
        />
      ))}
    </div>
  );
}
