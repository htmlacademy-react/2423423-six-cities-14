import { createReducer } from '@reduxjs/toolkit';
import { changedCity, changedFilter, setOffers } from './action';
import { OfferApi } from '../types/offer';

interface IInitialState {
  city: string;
  filter: {
    id: string;
    title: string;
  };
  offers: OfferApi[];
}

const initialState: IInitialState = {
  city: 'Paris',
  filter: { id: 'pop', title: 'Popular' },
  offers: [],
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
    });
});
