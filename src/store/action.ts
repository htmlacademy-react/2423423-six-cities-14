import { createAction } from '@reduxjs/toolkit';
import { OfferApi } from '../types/offer';
export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  FILTER_CITY:'FILTER_CITY',
  GET_OFFERS:'data/fetchOffers',
};


export const changedCity = createAction(Action.CHANGE_CITY, (value: string) => ({
  payload: value,
}));
export const changedFilter = createAction(Action.FILTER_CITY, (id: string, value: string) => ({
  payload: {
    id: id,
    title: value,
  },
}));
export const setOffers = createAction(Action.GET_OFFERS, (value: OfferApi[]) => ({
  payload: value,
}));


