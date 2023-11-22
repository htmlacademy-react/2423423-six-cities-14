import { createReducer } from '@reduxjs/toolkit';
import {
  authAction,
  changedCity,
  changedFilter,
  setComments,
  setError,
  setOffer,
  setOfferNearby,
  setOffers,
  setstatusAuth,
} from './action';
import { OfferApi } from '../types/offer';
import { User } from '../types/user';
import { AuthorizationStatus } from '../consts/consts';
import { Comment } from '../types/comment';

interface IInitialState {
  city: string;
  filter: {
    id: string;
    title: string;
  };
  offers: OfferApi[];
  activeOffer: OfferApi | null;
  offerNearby: OfferApi[];
  userData: User | null;
  statusAuthorization: AuthorizationStatus;
  error: string | null;
  reviews: Comment[];
}

const initialState: IInitialState = {
  city: 'Paris',
  filter: { id: 'pop', title: 'Popular' },
  offers: [],
  activeOffer: null,
  offerNearby: [],
  userData: null,
  statusAuthorization: AuthorizationStatus.NoAuth,
  error: null,
  reviews: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changedCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changedFilter, (state, action) => {
      state.filter = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffer, (state, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(setOfferNearby, (state, action) => {
      state.offerNearby = action.payload;
    })
    .addCase(authAction, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setstatusAuth, (state, action) => {
      state.statusAuthorization = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.reviews = action.payload;
    });
});
