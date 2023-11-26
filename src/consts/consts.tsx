export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';
export const AUTH_TOKEN_NAME = 'six-cities-token';
export const TIMEOUT_SHOW_ERROR = 2000;
export const MAX_REVIEW_COUNT = 10;
export const DEFAULT_LOCATION = 'Paris';
export const RATING_NUMBERS = [
  { id: 1, number: 5, title: 'perfect' },
  { id: 2, number: 4, title: 'good' },
  { id: 3, number: 3, title: 'not bad' },
  { id: 4, number: 2, title: 'badly' },
  { id: 5, number: 1, title: 'terribly' },
];
export const LOCATIONS_NAME: string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];
export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
export enum NameSpace {
  Offers = 'offers',
  User = 'user',
  Favorites = 'favorites',
}
export const enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}
