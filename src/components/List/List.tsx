import { IPlaces } from '../../interfaces/IPlaces';
import Card from '../card/Card';
import { useState } from 'react';
type TPlacesProps = {
  places: IPlaces[];
};

export default function List({ places }: TPlacesProps) {
  const [isActiveCard, setIsActivCard] = useState<number>();
  const getActiveCard = (id: number) => {
    setIsActivCard(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {places.map((place) => (
        <Card key={place.id} place={place} getActiveCard={getActiveCard} />
      ))}
    </div>
  );
}
