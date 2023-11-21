import { useDispatch } from 'react-redux';
import { changedFilter } from '../../store/action';
import { useAppSelector } from '../../interfaces/IStore';
import { useState } from 'react';
import { OfferApi } from '../../types/offer';

type ICityProps = {
  isActiveCity: OfferApi;
};
interface ISettings {
  id: string;
  title: string;
}

const settings: ISettings[] = [
  { id: 'pop', title: 'Popular' },
  { id: 'lth', title: 'Price: low to high' },
  { id: 'htl', title: 'Price: high to low' },
  { id: 'top', title: 'Top rated first' },
];

function FilterOffer({ isActiveCity }: ICityProps) {
  const [toggle, setToggleSort] = useState(false);
  const activeFilterCategory = useAppSelector((state) => state.filter);
  const dispatch = useDispatch();
  const handleClick = (id: string, title: string) => {
    dispatch(changedFilter(id, title));
  };

  //считаю количество предложений по заданному городу
  const fullOffers = useAppSelector((state) => state.offers);
  const arrayOffers = fullOffers.filter(
    (item) => item.city.name === isActiveCity.city.name
  );

  return (
    <>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {arrayOffers.length} places to stay in {isActiveCity.city.name}
      </b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          tabIndex={0}
          onClick={() => setToggleSort(!toggle)}
        >
          {activeFilterCategory.title}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul
          className={`places__options places__options--custom ${
            toggle && 'places__options--opened'
          }`}
        >
          {settings.map((item) => (
            <li
              key={item.id}
              className={`places__option ${
                activeFilterCategory.title === item.title &&
                'places__option--active'
              }`}
              tabIndex={0}
              onClick={() => handleClick(item.id, item.title)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}

export default FilterOffer;
