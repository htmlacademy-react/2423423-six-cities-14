import { createReducer } from '@reduxjs/toolkit';
import { changedCity, changedFilter } from './action';

interface IInitialState {
  city: string;
  filter: {
    id: string;
    title: string;
  };
}

const initialState: IInitialState = {
  city: 'Paris',
  filter: { id: 'pop', title: 'Popular' },
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changedCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changedFilter, (state, action) => {
      state.filter = action.payload;
    });
});
