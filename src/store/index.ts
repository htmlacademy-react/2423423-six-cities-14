import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../utils/api';
import { NameSpace } from '../consts/consts';
import { offerSlice } from './slices/offer';
import { userSlice } from './slices/user';
import { favoriteSlice } from './slices/favorite';

export const api = createAPI();

export const reducer = combineReducers({
  [NameSpace.Offers]: offerSlice.reducer ,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Favorites]: favoriteSlice.reducer,
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
