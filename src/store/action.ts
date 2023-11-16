import { createAction } from '@reduxjs/toolkit';
export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  FILTER_CITY:'FILTER_CITY',
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

