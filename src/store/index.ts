import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { NameSpace } from '../consts/consts';
import { offerSlice } from './slices/offer';
import { userSlice } from './slices/user';
import { citySlice } from './slices/city';

export const api = createAPI();

export const reducer = combineReducers({
  [NameSpace.Offers]: offerSlice.reducer ,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.City]: citySlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
