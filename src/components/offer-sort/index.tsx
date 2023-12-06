import { useAppDispatch, useAppSelector } from '../../types/store';
import { useState } from 'react';
import { offerSlice } from '../../store/slices/offer';
import classNames from 'classnames';
import { sortingOptions } from '../../consts/consts';

function OfferSorting() {
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);
  const optionsClassNames = classNames(
    'places__options',
    'places__options--custom',
    {'places__options--opened': isOptionsOpened,}
  );
  const activeOption = useAppSelector((store) => store.offers.sortingOption);
  const dispatch = useAppDispatch();
  const handleOptionClick = (state: string) => {
    dispatch(offerSlice.actions.changeSortOption(state));
    setIsOptionsOpened(!isOptionsOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get" data-testid='offer sort'>
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOptionsOpened(!isOptionsOpened)}
        style={{ fontSize: '13px', paddingLeft: '10px' }}
      >
        {activeOption}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={optionsClassNames}>
        {sortingOptions.map((option) => (
          <li
            key={option}
            className={
              option === activeOption
                ? 'places__option places__option--active'
                : 'places__option'
            }
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default OfferSorting;
