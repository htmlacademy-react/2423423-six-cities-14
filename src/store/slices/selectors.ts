import { NameSpace } from '../../consts/consts';
import { Comment } from '../../types/comment';
import { OfferApi } from '../../types/offer';
import { State } from '../../types/store';

export const getSortingOption = (state: State) => state.offers.sortingOption;

export const getCurrentOffer = (state: Pick<State, NameSpace.Offers>): OfferApi | null => state[NameSpace.Offers].currentOffer;

export const getCurrentComments = (state: Pick<State, NameSpace.Offers>): Comment[] => state[NameSpace.Offers].currentOfferComments;

export const getNearbyOffers = (state: Pick<State, NameSpace.Offers>): OfferApi[] => state.offers.nearbyOffers;

export const getAuthStatus = (state: State) => state.user.authorizationStatus;

export const getRating = (rating: number) => Math.round(rating) / 5 * 100;
