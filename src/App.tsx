import Login from './pages/Login';
import Main from './pages/Main';
import NotFound from './pages/NTF/NotFound';
import Offer from './pages/Offer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute';
import './styles/styles.css';
import { AppRoute } from './consts/route';
import { HelmetProvider } from 'react-helmet-async';
import {
  AuthorizationStatus,
  LOCATIONS_NAME,
  LoadingStatus,
} from './consts/consts';
import Spinner from './components/spinner';
import RedirectToMain from './components/redirect-main';
import Favorites from './pages/Favorites';
import { useAppSelector } from './types/store';

export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );
  const loadingStatus = useAppSelector(
    (state) => state.offers.isOffersDataLoading
  );
  if (
    loadingStatus === LoadingStatus.Idle ||
    loadingStatus === LoadingStatus.Pending ||
    authorizationStatus === AuthorizationStatus.Unknown
  ) {
    return <Spinner />;
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Main />}>
            {LOCATIONS_NAME.map((city) => (
              <Route key={city} path={city} element={<Main />}></Route>
            ))}
          </Route>
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
          <Route path={AppRoute.Offer}>
            <Route path={':id'} element={<Offer />} />
          </Route>
          <Route path={AppRoute.NotFound} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
