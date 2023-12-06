import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LOCATIONS_NAME } from '../../consts/consts';
import { AppRoute } from '../../consts/route';
import { citySlice } from '../../store/slices/city';
import { memo } from 'react';

function TabsMemo() {
  const dispatch = useDispatch();
  const LINK_CLASS = 'locations__item-link tabs__item';
  const ACTIVE_CLASS = `${LINK_CLASS} tabs__item--active`;
  return (
    <ul className="locations__list tabs__list" data-testid ='tabs'>
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

const Tabs = memo(TabsMemo);
export default Tabs;
