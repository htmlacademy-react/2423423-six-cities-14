<<<<<<< HEAD
import { city } from '../../mock/City';
import { useDispatch } from 'react-redux';
import { changedCity } from '../../store/action';
import { useState } from 'react';

function Tabs() {
  const [isActiveTab, setIsActiveTab] = useState('Paris');
  const dispatch = useDispatch();
  const handleClick = (name: string) => {
    dispatch(changedCity(name));
    setIsActiveTab(name);
  };
=======
function Tabs() {
>>>>>>> origin
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
<<<<<<< HEAD
            {city.map((item) => (
              <li
                className="locations__item"
                key={item.name}
                onClick={() => handleClick(item.name)}
              >
                <a
                  className={`locations__item-link tabs__item  ${isActiveTab === item.name && 'tabs__item--active'}`}
                  href="#"
                >
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
=======
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Paris</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Cologne</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Brussels</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item tabs__item--active">
                <span>Amsterdam</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Hamburg</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Dusseldorf</span>
              </a>
            </li>
>>>>>>> origin
          </ul>
        </section>
      </div>
    </>
  );
}

export default Tabs;
