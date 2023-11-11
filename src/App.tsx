import Login from './components/pages/Login';
import Main from './components/pages/Main';
import NotFound from './components/pages/NotFound';
import Offer from './components/pages/Offer';
import { IPlaces } from './interfaces/IPlaces';
import { placesMock } from './mock/Places';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import PrivateRoute from './components/pages/PrivateRoute';
import './styles/styles.css';
import { AppRoute } from './consts/route';

export default function App() {
  const places: IPlaces[] = placesMock;
  const [isAuthorized, setIsAuthorized] = useState(true);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Main places={places} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route
          path={AppRoute.Favorites}
          element={<PrivateRoute isAuthorized={isAuthorized} />}
        />
        <Route path={AppRoute.Offer} element={<Offer />} />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
