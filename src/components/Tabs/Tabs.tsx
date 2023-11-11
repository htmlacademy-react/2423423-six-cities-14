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
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
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
          </ul>
        </section>
      </div>
    </>
  );
}

export default Tabs;
