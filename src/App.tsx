import Login from './pages/Login';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Offer from './pages/Offer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute';
import './styles/styles.css';
import { AppRoute } from './consts/route';

import { AuthorizationStatus, LOCATIONS_NAME, LoadingStatus} from './consts/consts';
import Spinner from './components/Spinner/Spinner';
import RedirectToMain from './pages/RedirectToMain';
import Favorites from './pages/Favorites';
import { useAppSelector } from './types/store';


export default function App() {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const loadingStatus = useAppSelector((state) => state.offers.isOffersDataLoading);
  if (loadingStatus === LoadingStatus.Idle || loadingStatus === LoadingStatus.Loading || authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }
  return (
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
        <Route path={AppRoute.Offer} element={<Offer />} />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
