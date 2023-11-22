import { createAction } from '@reduxjs/toolkit';
import { OfferApi } from '../types/offer';
export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  FILTER_CITY:'FILTER_CITY',
  GET_OFFERS:'data/offers',
  GET_OFFER:'data/offer',
  GET_OFFERNEARBY:'data/offerNearby',
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

export const setOffer = createAction(Action.GET_OFFER, (value: OfferApi) => ({
  payload: value,
}));

export const setOfferNearby = createAction(Action.GET_OFFERNEARBY, (value: OfferApi[]) => ({
  payload: value,
}));


