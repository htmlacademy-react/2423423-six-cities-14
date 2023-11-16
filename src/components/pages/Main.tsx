import { IPlaces } from '../../interfaces/IPlaces';
import List from '../List/List';
import { city } from '../../mock/City';
import Map from '../Map/Map';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Tabs from '../Tabs/Tabs';
import FilterOffer from '../FilterOffer/FilterOffer';
import { placesMock } from '../../mock/Places';
import { ICity } from '../../interfaces/ICity';
import { useAppSelector } from '../../interfaces/IStore';

type TPlacesProps = {
  places: IPlaces[];
};

export default function Main({ places }: TPlacesProps) {
  const activeCityName = useAppSelector((state) => state.city);
  //определение id сортировки и применение соответствующего фильтра
  const activeFilterCategory = useAppSelector((state) => state.filter.id);
  const switchFilter = (itemA: IPlaces, itemB: IPlaces) => {
    switch (activeFilterCategory) {
      case 'lth':
        return itemA.price - itemB.price;
        break;
      case 'htl':
        return itemB.price - itemA.price;
        break;
      case 'top':
        return itemB.rating - itemA.rating;
        break;
      default:
        break;
    }
  };

  const [selectedPoint, setSelectedPoint] = useState<IPlaces | undefined>(
    undefined
  );

  //определение на какое предложение пользователь навел мышь
  const handleListItemHover = (listItemName: string | undefined) => {
    const currentPoint = places.find((point) => point.name === listItemName);
    setSelectedPoint(currentPoint);
  };

  //определяю данные активного города и данные его предложений для передачи в карту
  const [isActiveCityData, setIsActiveCityData] = useState<ICity>();
  const [isAllPlacesData, setIsAllPlacesData] = useState<IPlaces[]>();
  useEffect(() => {
    const findCityData = city.find((item) => item.name === activeCityName);
    if (findCityData) {
      setIsActiveCityData(findCityData);
    }

    const findPlacesCityData = placesMock.filter(
      (item) => item.location === activeCityName
    );
    if (findPlacesCityData) {
      const sortingPlacesData = findPlacesCityData.sort((itemA, itemB) => switchFilter(itemA, itemB) );
      setIsAllPlacesData(sortingPlacesData);
    }
  }, [activeCityName, activeFilterCategory]);

  if (!isActiveCityData || !isAllPlacesData) {
    return false;
  }
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <Tabs />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <FilterOffer isActiveCity={isActiveCityData} />

              <List
                places={isAllPlacesData}
                onListItemHover={handleListItemHover}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map ">
                <Map
                  key={isActiveCityData.name}
                  city={isActiveCityData}
                  places={isAllPlacesData}
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
