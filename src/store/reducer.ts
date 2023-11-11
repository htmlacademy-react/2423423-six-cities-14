import { IPlaces } from '../interfaces/IPlaces';
import { createReducer } from '@reduxjs/toolkit';
import { changedCity } from './action';
import { placesMock } from '../mock/Places';

// interface InitialState {
//   places: IPlaces[];
// }

// const initialState: InitialState = {
//   places: placesMock,
// };

interface IInitialState {
  city: string;
}

const initialState: IInitialState = {
  city: 'Paris',
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changedCity, (state, action) => {
    // state.places = placesMock.filter((place) => place.location === action.payload);
    state.city = action.payload;
  });
});
