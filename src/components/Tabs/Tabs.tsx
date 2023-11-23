import { useDispatch } from 'react-redux';
import { changedCity } from '../../store/action';
import { useAppSelector } from '../../types/store';
import { Link } from 'react-router-dom';
import { LOCATIONS_NAME } from '../../consts/consts';
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
            {LOCATIONS_NAME.map((item) => (
              <li
                className="locations__item"
                key={item}
                onClick={() => handleClick(item)}
              >
                <Link
                  to="#"
                  className={`locations__item-link tabs__item  ${
                    activeCityName === item && 'tabs__item--active'
                  }`}
                >
                  <span>{item}</span>
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
