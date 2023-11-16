import { createAction } from '@reduxjs/toolkit';
export const Action = {
  SEL_CITY: 'SEL_CITY',
  CHANGE_CITY: 'CHANGE_CITY',
  FILLING_LIST: 'FILLING_LIST',
};

export const selectedCity = createAction(Action.SEL_CITY);
export const changedCity = createAction(Action.CHANGE_CITY, (value: string) => ({
  payload: value,
}));
export const fillingList = createAction(Action.FILLING_LIST);
