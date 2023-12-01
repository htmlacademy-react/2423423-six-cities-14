import { DEFAULT_LOCATION } from '../../consts/consts';
import { citySlice } from './city';

describe('auth status slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      city: DEFAULT_LOCATION,
    };

    const result = citySlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = {type: ''};

    const expectedState = {
      city: DEFAULT_LOCATION,
    };

    const result = citySlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
