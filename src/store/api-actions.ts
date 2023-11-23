import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../types/store';
import { OfferApi } from '../types/offer';
import { APIRoute } from '../consts/route';
import {
  Action,
  addComment,
  authAction,
  setComments,
  setError,
  setFavoriteOffers,
  setOffer,
  setOfferNearby,
  setOffers,
  setstatusAuth,
  toggleFavoriteOffer,
} from './action';
import { AuthData, User, UserData } from '../types/user';
import { addToken, deleteToken } from '../utils/token';
import { AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../consts/consts';
import { store } from '.';
import { Comment, PostComment } from '../types/comment';

export type Extra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<void, undefined, Extra>(
  Action.GET_OFFERS,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferApi[]>(APIRoute.Offer);
    dispatch(setOffers(data));
  }
);

export const fetchOfferAction = createAsyncThunk<
  void,
  string | undefined,
  Extra
>(Action.GET_OFFER, async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferApi>(`${APIRoute.Offer}/${id}`);
  dispatch(setOffer(data));
});

export const fetchOffersNearby = createAsyncThunk<
  void,
  string | undefined,
  Extra
>(Action.GET_OFFERNEARBY, async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferApi[]>(
    `${APIRoute.Offer}/${id}${APIRoute.Nearby}`
  );
  dispatch(setOfferNearby(data));
});

export const loginAction = createAsyncThunk<void, AuthData, Extra>(
  Action.AUTH,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
      data,
    } = await api.post<UserData | User>(APIRoute.Login, { email, password });
    dispatch(authAction(data as User));
    dispatch(setstatusAuth(AuthorizationStatus.Auth));
    addToken(token);
  }
);

export const logoutAction = createAsyncThunk<void, undefined, Extra>(
  Action.NOAUTH,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    deleteToken();
    dispatch(setstatusAuth(AuthorizationStatus.NoAuth));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, Extra>(
  Action.CHECK_AUTH,
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setstatusAuth(AuthorizationStatus.Auth));
    } catch {
      dispatch(setstatusAuth(AuthorizationStatus.NoAuth));
    }
  }
);

export const clearErrorAction = createAsyncThunk(Action.ERROR, () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

export const fetchComments = createAsyncThunk<void, string | undefined, Extra>(
  Action.REVIEWS,
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Comment[]>(`${APIRoute.Reviews}/${id}`);
    dispatch(setComments(data));
  }
);

export const postComment = createAsyncThunk<void, PostComment, Extra>(
  'user/postComment',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<PostComment>(`${APIRoute.Reviews}/${id}`, {
      comment,
      rating,
    });

    dispatch(addComment(data));
  }
);

export const fetchFavorites = createAsyncThunk<void, undefined, Extra>(
  Action.FAVORITES,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferApi[]>(APIRoute.Favorite);
    dispatch(setFavoriteOffers(data));
  }
);

export const toogleFavorites = createAsyncThunk<void, OfferApi, Extra>(
  Action.TOGGLE_FAVOR,
  async ({id, isFavorite}, { dispatch, extra: api }) => {
    const { data } = await api.post<OfferApi>(`${APIRoute.Favorite}/${id}`, {
      isFavorite,
    });
    dispatch(toggleFavoriteOffer(data));
  }
);
