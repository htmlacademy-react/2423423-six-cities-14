import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import {
  changedCity,
  changedFilter,
  setOffer,
  setOfferNearby,
  setOffers,
} from './action';
import { OfferApi } from '../types/offer';

interface IInitialState {
  city: string;
  filter: {
    id: string;
    title: string;
  };
  offers: OfferApi[];
  activeOffer: OfferApi | null;
  offerNearby: OfferApi[];
}

const initialState: IInitialState = {
  city: 'Paris',
  filter: { id: 'pop', title: 'Popular' },
  offers: [],
  activeOffer: null,
  offerNearby: [],
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
    .addCase(setOffer, (state, action: PayloadAction<OfferApi | null>) => {
      state.activeOffer = action.payload;
    })
    .addCase(setOfferNearby, (state, action) => {
      state.offerNearby = action.payload;
    });
});
