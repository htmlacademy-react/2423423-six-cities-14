import { State } from '../../types/store';

export const getSortingOption = (state: State) => state.offers.sortingOption;

export const getCurrentOffer = (state: State) => state.offers.currentOffer;

export const getCurrentComments = (state: State) => state.offers.currentOfferComments;

export const getNearbyOffers = (state: State) => state.offers.nearbyOffers;

export const getAuthStatus = (state: State) => state.user.authorizationStatus;

export const getRating = (rating: number) => Math.round(rating) / 5 * 100;
