import { IPlaces } from '../../interfaces/IPlaces';
import List from '../List/List';
import { city } from '../../mock/City';
import Map from '../Map/Map';
import { useState } from 'react';
import Header from '../Header/Header';
import Tabs from '../Tabs/Tabs';
import Sort from '../Sort/Sort';
type TPlacesProps = {
  places: IPlaces[];
};

export default function Main({ places }: TPlacesProps) {
  const [selectedPoint, setSelectedPoint] = useState<IPlaces | undefined>(
    undefined
  );

  const handleListItemHover = (listItemName: string | undefined) => {
    const currentPoint = places.find((point) => point.name === listItemName);
    setSelectedPoint(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <Tabs />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <Sort />

              <List places={places} onListItemHover={handleListItemHover} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map ">
                <Map
                  city={city}
                  places={places}
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
