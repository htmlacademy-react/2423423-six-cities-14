import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../interfaces/IStore';
import { OfferApi } from '../types/offer';
import { APIRoute } from '../consts/route';
import { Action, setOffers } from './action';

export type Extra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<OfferApi[], undefined, Extra>(
  Action.GET_OFFERS,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferApi[]>(APIRoute.Offer);
    dispatch(setOffers(data));
  }
);
