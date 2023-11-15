import { createReducer } from '@reduxjs/toolkit';
import { changedCity } from './action';

interface IInitialState {
  city: string;
}

const initialState: IInitialState = {
  city: 'Paris',
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changedCity, (state, action) => {
    state.city = action.payload;
  });
});
