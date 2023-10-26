import Card from '../card/Card';
import { IOfferMock } from '../../interfaces/IOfferMock';

type TPlacesProps = {
  offers: IOfferMock[];
};

export default function List({ offers }: TPlacesProps) {
  return (
    <>
      {offers.map((place) => (
        <Card key={place.id} place={place} />
      ))}
    </>
  );
}
