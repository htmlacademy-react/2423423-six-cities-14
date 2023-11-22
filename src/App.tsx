import Login from './components/pages/Login';
import Main from './components/pages/Main';
import NotFound from './components/pages/NotFound';
import Offer from './components/pages/Offer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/pages/PrivateRoute';
import './styles/styles.css';
import { AppRoute } from './consts/route';
import { useAppSelector } from './types/store';
import { AuthorizationStatus } from './consts/consts';
import Spinner from './components/Spinner/Spinner';
import RedirectToMain from './components/pages/RedirectToMain';
import Favorites from './components/pages/Favorites';

export default function App() {
  const authorizationStatus = useAppSelector(
    (state) => state.statusAuthorization
  );
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Main />} />
        <Route
          path={AppRoute.Login}
          element={
            <RedirectToMain>
              <Login />
            </RedirectToMain>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<Offer />} />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
