import Login from './components/pages/Login';
import Main from './components/pages/Main';
import NotFound from './components/pages/NotFound';
import Offer from './components/pages/Offer';
import { IPlaces } from './interfaces/IPlaces';
import { placesMock } from './mock/Places';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import PrivateRoute from './components/pages/PrivateRoute';

export default function App() {
  const places: IPlaces[] = placesMock;
  const [isAuthorized, setIsAuthorized] = useState(true);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main places={places} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/favorites"
          element={<PrivateRoute isAuthorized={isAuthorized} />}
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
