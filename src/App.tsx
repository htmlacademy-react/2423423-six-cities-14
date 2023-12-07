import Login from './pages/Login';
import Main from './pages/Main';
import NotFound from './pages/NTF/NotFound';
import Offer from './pages/Offer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute';
import './styles/styles.css';
import { AppRoute } from './consts/route';
import { HelmetProvider } from 'react-helmet-async';
import { LOCATIONS_NAME } from './consts/consts';
import RedirectToMain from './components/redirect-main';
import Favorites from './pages/Favorites';
import { useAppDispatch } from './types/store';
import { checkAuthAction, fetchOffers } from './store/api-actions';
import Scroll from './components/scroll';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(checkAuthAction());
  dispatch(fetchOffers());

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Scroll>
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
        </Scroll>
      </BrowserRouter>
    </HelmetProvider>
  );
}
