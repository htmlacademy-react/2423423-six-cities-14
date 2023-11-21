import Login from './components/pages/Login';
import Main from './components/pages/Main';
import NotFound from './components/pages/NotFound';
import Offer from './components/pages/Offer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/pages/PrivateRoute';
import './styles/styles.css';
import { AppRoute } from './consts/route';

export default function App() {

  const isAuthorized = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Main/>} />
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
