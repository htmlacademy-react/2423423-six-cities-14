import { IPlaces } from '../../interfaces/IPlaces';
import List from '../List/List';
import { city } from '../../mock/City';
import Map from '../Map/Map';
<<<<<<< HEAD
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Tabs from '../Tabs/Tabs';
import Sort from '../Sort/Sort';
import { placesMock } from '../../mock/Places';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { store } from '../../store';
import { ICity } from '../../interfaces/ICity';

type State = ReturnType<typeof store.getState>;

=======
import { useState } from 'react';
import Header from '../Header/Header';
import Tabs from '../Tabs/Tabs';
import Sort from '../Sort/Sort';
>>>>>>> origin
type TPlacesProps = {
  places: IPlaces[];
};

export default function Main({ places }: TPlacesProps) {
  const [selectedPoint, setSelectedPoint] = useState<IPlaces | undefined>(
    undefined
  );

<<<<<<< HEAD
  //поиск города и его точек предложений по аренде, в зависимости от нажатого города в tabs
=======
>>>>>>> origin
  const handleListItemHover = (listItemName: string | undefined) => {
    const currentPoint = places.find((point) => point.name === listItemName);
    setSelectedPoint(currentPoint);
  };

<<<<<<< HEAD
  const useAppSelector: TypedUseSelectorHook<State> = useSelector;
  const placesTest = useAppSelector((state) => state.city);

  const [isActiveCity, setIsActiveCity] = useState<ICity | undefined>(
    undefined
  );
  const [isAllPlaces, setIsAllPlaces] = useState<IPlaces[] | undefined>(
    undefined
  );
  useEffect(() => {
    const findCityData = city.find((item) => item.name === placesTest);
    if (findCityData) {
      setIsActiveCity(findCityData);
    }

    const findPlacesCityData = placesMock.filter(
      (item) => item.location === placesTest
    );
    if (findPlacesCityData) {
      setIsAllPlaces(findPlacesCityData);
    }
  }, [placesTest]);

  if (!isActiveCity || !isAllPlaces) {
    return false;
  }
=======
>>>>>>> origin
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <Tabs />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
<<<<<<< HEAD
              <Sort isActiveCity={isActiveCity} />

              <List places={isAllPlaces} onListItemHover={handleListItemHover} />
=======
              <Sort />

              <List places={places} onListItemHover={handleListItemHover} />
>>>>>>> origin
            </section>
            <div className="cities__right-section">
              <section className="cities__map ">
                <Map
<<<<<<< HEAD
                  key={isActiveCity.name}
                  city={isActiveCity}
                  places={isAllPlaces}
=======
                  city={city}
                  places={places}
>>>>>>> origin
                  selectedPoint={selectedPoint}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
