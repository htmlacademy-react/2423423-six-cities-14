import { city } from '../../mock/City';
import { useDispatch } from 'react-redux';
import { changedCity } from '../../store/action';
import { useAppSelector } from '../../types/store';
import { Link } from 'react-router-dom';
function Tabs() {
  const activeCityName = useAppSelector((state) => state.city);
  const dispatch = useDispatch();
  const handleClick = (name: string) => {
    dispatch(changedCity(name));
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
                <Link
                  to="#"
                  className={`locations__item-link tabs__item  ${
                    activeCityName === item.name && 'tabs__item--active'
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default Tabs;
