import { useDispatch } from 'react-redux';
// import { useAppSelector } from '../../types/store';
import { NavLink } from 'react-router-dom';
import { offerSlice } from '../../store/slices/offer';

type cityName = {
  city: string;
};

function Tabs({ city }: cityName) {
  // const activeCityName = useAppSelector((state) => state.offers.city);
  const dispatch = useDispatch();

  return (
    <li className="locations__item">
      <NavLink
        to={`/${city}`}
        className={({isActive}) => isActive ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
        onClick={() => dispatch(offerSlice.actions.changedCity(city))}
      >
        <span>{city}</span>
      </NavLink>
    </li>
  );
}

export default Tabs;
