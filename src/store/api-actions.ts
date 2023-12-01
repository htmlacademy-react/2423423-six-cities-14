import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../types/store';
import { OfferApi } from '../types/offer';
import { APIRoute, AppRoute } from '../consts/route';
import { addToken, deleteToken } from '../services/token';
import { AuthorizationStatus } from '../consts/consts';
import { Comment} from '../types/comment';
import { FavoriteData } from '../types/favorite';
import { userSlice } from './slices/user';
import { AuthData, UserComment, UserData } from '../types/api-data';
import { redirectToRoute } from './action';

export type Extra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

// ********** USER **********
export const getCurrentUserData = createAsyncThunk<UserData, undefined, Extra>(
  'user/data',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);

    return data;
  }
);

// ********** OFFERS **********
export const fetchOffers = createAsyncThunk<OfferApi[], undefined, Extra>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferApi[]>(APIRoute.Offer);
    return data;
  }
);

export const fetchCurrenfOffer = createAsyncThunk<OfferApi, string | undefined,
  Extra
>('data/fetchCurrentOffer', async (offerId, { extra: api }) => {
  const { data } = await api.get<OfferApi>(`${APIRoute.Offer}/${offerId}`);
  return data;
});

export const fetchOffersNearby = createAsyncThunk<
  OfferApi[],
  string | undefined,
  Extra
>('data/fetchNearbyOffers', async (id, { extra: api }) => {
  const { data } = await api.get<OfferApi[]>(
    `${APIRoute.Offer}/${id}${APIRoute.Nearby}`
  );
  return data;
});

// ********** COMMENTS **********
export const fetchOfferComments = createAsyncThunk<
  Comment[],
  string | undefined,
  Extra
>('data/fetchOfferComments', async (id, { extra: api }) => {
  const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
  return data;
});

export const addComment = createAsyncThunk<Comment, UserComment, Extra>(
  'user/postComment',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<Comment>(`${APIRoute.Comments}/${offerId}`, {
      comment,
      rating,
    });
    return data;
  }
);

// ********** FAVORITES **********
export const fetchFavorites = createAsyncThunk<OfferApi[], undefined, Extra>(
  'data/fetchFavorites',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferApi[] | []>(APIRoute.Favorite);
    return data;
  }
);

export const setIsFavorite = createAsyncThunk<
  OfferApi,
  FavoriteData,
  Extra
>('postFavoriteOffer', async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<OfferApi>(
    `${APIRoute.Favorite}/${offerId}/${status}`
  );
  return data;
});

// ********** AUTH **********
export const checkAuthAction = createAsyncThunk<void, undefined, Extra>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(
        userSlice.actions.requireAuthStatus(AuthorizationStatus.Auth)
      );
    } catch {
      dispatch(
        userSlice.actions.requireAuthStatus(AuthorizationStatus.NoAuth)
      );
    }
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, Extra>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    dispatch(redirectToRoute(AppRoute.Root));
    addToken(data.token);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, Extra>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    deleteToken();
  }
);
