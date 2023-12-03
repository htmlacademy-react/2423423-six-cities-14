import { DEFAULT_SORTING, LoadingStatus } from '../../consts/consts';
import { offerSlice } from './offer';

describe('offer slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      offers: [],
      currentOffer: null,
      nearbyOffers: [],
      favoriteOffers: [],
      currentOfferComments: [],
      isOffersDataLoading: LoadingStatus.Idle,
      isOfferDataLoading: LoadingStatus.Idle,
      isCurrentOfferDataLoading: LoadingStatus.Idle,
      isCommentLoading: LoadingStatus.Idle,
      isFavoriteDataLoading: LoadingStatus.Idle,
      error: null,
      sortingOption: DEFAULT_SORTING,
    };

    const result = offerSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      offers: [],
      currentOffer: null,
      nearbyOffers: [],
      favoriteOffers: [],
      currentOfferComments: [],
      isOffersDataLoading: LoadingStatus.Idle,
      isOfferDataLoading: LoadingStatus.Idle,
      isCurrentOfferDataLoading: LoadingStatus.Idle,
      isCommentLoading: LoadingStatus.Idle,
      isFavoriteDataLoading: LoadingStatus.Idle,
      error: null,
      sortingOption: DEFAULT_SORTING,
    };

    const result = offerSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
