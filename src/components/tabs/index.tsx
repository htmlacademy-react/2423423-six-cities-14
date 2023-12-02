import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LOCATIONS_NAME } from '../../consts/consts';
import { AppRoute } from '../../consts/route';
import { citySlice } from '../../store/slices/city';


function Tabs() {
  const dispatch = useDispatch();
  const LINK_CLASS = 'locations__item-link tabs__item';
  const ACTIVE_CLASS = `${LINK_CLASS} tabs__item--active`;
  return (
    <ul className="locations__list tabs__list">
      {LOCATIONS_NAME.map((localCity) => (
        <li key={localCity} className="locations__item">
          <NavLink
            to={`${AppRoute.Root}${localCity}`}
            className={({ isActive }) =>(isActive ? ACTIVE_CLASS : LINK_CLASS)}
            onClick={() => dispatch(citySlice.actions.changeCity(localCity))}
          >
            <span>{localCity}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default Tabs;
