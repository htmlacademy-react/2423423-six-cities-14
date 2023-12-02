import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_LOCATION, NameSpace } from '../../consts/consts';

type CityState = {
  city: string;
}

const initialState: CityState = {
  city: DEFAULT_LOCATION,
};

export const citySlice = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    }
  },
});

export const { changeCity } = citySlice.actions;
