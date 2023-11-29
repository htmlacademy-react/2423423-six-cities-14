import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../types/store';
import { NavLink } from 'react-router-dom';
import { LOCATIONS_NAME } from '../../consts/consts';
import { offerSlice } from '../../store/slices/offer';

function Tabs() {
  const activeCityName = useAppSelector((state) => state.offers.city);
  const dispatch = useDispatch();
  const handleClick = (name: string) => {
    dispatch(offerSlice.actions.changedCity(name));
  };
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {LOCATIONS_NAME.map((item) => (
              <li className="locations__item" key={item}>
                <NavLink
                  to={`/${item}`}
                  className={`locations__item-link tabs__item  ${
                    activeCityName === item && 'tabs__item--active'
                  }`}
                  onClick={() => handleClick(item)}
                >
                  <span>{item}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default Tabs;
