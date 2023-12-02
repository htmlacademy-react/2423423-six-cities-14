import { AuthorizationStatus, LoadingStatus } from '../../consts/consts';
import { userSlice } from './user';

describe('auth status slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: {},
      isUserDataLoading: LoadingStatus.Idle,
      isLoginLoading: LoadingStatus.Idle,
    };

    const result = userSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = {type: ''};

    const expectedState = {
      authStatus: AuthorizationStatus.Unknown,
      userData: {},
      isUserDataLoading: LoadingStatus.Idle,
      isLoginLoading: LoadingStatus.Idle,
    };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
