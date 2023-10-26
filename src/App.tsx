import Login from './components/pages/Login';
import Main from './components/pages/Main';
import NotFound from './components/pages/NotFound';
import Offer from './components/pages/Offer';
import PrivateRoute from './components/pages/PrivateRoute';
import { IPlaces } from './interfaces/IPlaces';
import { placesMock } from './mock/Places';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  const places: IPlaces[] = placesMock;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Main places={places} />}/>
        <Route path="/login" element={ <Login/>}/>
        <Route path="/favorites" element={ <PrivateRoute />}/>
        <Route path="/offer/:id" element={ <Offer />} />
        <Route path="/*" element={ <NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
