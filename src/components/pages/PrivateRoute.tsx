import { useState } from 'react';
import Favorites from './Favorites';

export default function PrivateRoute() {
  const [login, setLogin] = useState(false);
  return (
    <div className="page page--gray page--privateRoute">
      {login ? <Favorites /> : <p>Извините, но доступ разрешен только авторизованным пользователям</p>}
    </div>
  );
}
