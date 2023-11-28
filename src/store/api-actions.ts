import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../types/store';
import { OfferApi } from '../types/offer';
import { APIRoute } from '../consts/route';
import { AuthData, User } from '../types/user';
import { addToken, deleteToken } from '../utils/token';
import { AuthorizationStatus } from '../consts/consts';
import { Comment, PostComment } from '../types/comment';
import { FavoriteData } from '../types/favorite';
import { userSlice } from './slices/user';

export type Extra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

// ********** USER **********
export const fetchUserData = createAsyncThunk<User, undefined, Extra>(
  'user/data',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User>(APIRoute.Login);

    return data;
  }
);

// ********** COMMENTS **********
export const fetchComments = createAsyncThunk<
  Comment[],
  string | undefined,
  Extra
>('user/comments', async (id, { extra: api }) => {
  const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
  return data;
});

export const postComment = createAsyncThunk<PostComment, PostComment, Extra>(
  'user/postComment',
  async ({ id, comment, rating }, { extra: api }) => {
    const { data } = await api.post<PostComment>(`${APIRoute.Comments}/${id}`, {
      comment,
      rating,
    });
    return data;
  }
);

// ********** OFFERS **********
export const fetchOffersAction = createAsyncThunk<OfferApi[], undefined, Extra>(
  'offers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferApi[]>(APIRoute.Offer);
    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<
  OfferApi,
  string | undefined,
  Extra
>('offer', async (id, { extra: api }) => {
  const { data } = await api.get<OfferApi>(`${APIRoute.Offer}/${id}`);
  return data;
});

export const fetchOffersNearby = createAsyncThunk<
  OfferApi[],
  string | undefined,
  Extra
>('offersNearBy', async (id, { extra: api }) => {
  const { data } = await api.get<OfferApi[]>(
    `${APIRoute.Offer}/${id}${APIRoute.Nearby}`
  );
  return data;
});

// ********** FAVORITES **********
export const fetchFavorites = createAsyncThunk<OfferApi[], undefined, Extra>(
  'favoriteOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferApi[] | []>(APIRoute.Favorite);
    return data;
  }
);

export const postFavoriteOffer = createAsyncThunk<
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
        userSlice.actions.setAuthorizationStatus(AuthorizationStatus.Auth)
      );
    } catch {
      dispatch(
        userSlice.actions.setAuthorizationStatus(AuthorizationStatus.NoAuth)
      );
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, Extra>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
      data,
    } = await api.post<User>(APIRoute.Login, { email, password });
    dispatch(
      userSlice.actions.setAuthorizationStatus(AuthorizationStatus.Auth)
    );
    dispatch(userSlice.actions.addUserData(data));
    addToken(token);
  }
);

export const logoutAction = createAsyncThunk<void, undefined, Extra>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    deleteToken();
    dispatch(
      userSlice.actions.setAuthorizationStatus(AuthorizationStatus.NoAuth)
    );
  }
);

