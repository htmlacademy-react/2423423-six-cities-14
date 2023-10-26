import { useState } from 'react';
import Favorites from './Favorites';
import { IOfferMock } from '../../interfaces/IOfferMock';

interface IOffersProps {
  offers: IOfferMock[];
}

export default function PrivateRoute({offers}:IOffersProps) {
  const [login, setLogin] = useState(true);
  return (
    <div className="page page--gray page--privateRoute">
      {login ? <Favorites offers={offers} /> : <p>Извините, но доступ разрешен только авторизованным пользователям</p>}
    </div>
  );
}
