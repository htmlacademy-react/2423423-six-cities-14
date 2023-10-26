import Login from './components/pages/Login';
import Main from './components/pages/Main';
import NotFound from './components/pages/NotFound';
import Offer from './components/pages/Offer';
import PrivateRoute from './components/pages/PrivateRoute';
import { IOfferMock } from './interfaces/IOfferMock';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

interface IOffersProps {
  offers: IOfferMock[];
}

export default function App({ offers }: IOffersProps) {
  // const places: IOfferMock[] = offerMock;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main offers={offers} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<PrivateRoute offers={offers}/>} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
