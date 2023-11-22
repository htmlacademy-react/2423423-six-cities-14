import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../interfaces/IStore';
import { OfferApi } from '../types/offer';
import { APIRoute } from '../consts/route';
import { Action, setOffer, setOfferNearby, setOffers } from './action';

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

export const fetchOffersNearby = createAsyncThunk<void, string | undefined, Extra>(
  Action.GET_OFFERNEARBY,
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferApi[]>(
      `${APIRoute.Offer}/${id}${APIRoute.Nearby}`
    );
    dispatch(setOfferNearby(data));
  }
);
