import { Location } from '../types/location';

export const URL_MARKER_DEFAULT = './img/pin.svg';
export const URL_MARKER_CURRENT = './img/pin-active.svg';

export const AUTH_TOKEN_NAME = 'six-cities-token';
export const TIMEOUT_SHOW_ERROR = 2000;

export const MAX_REVIEW_COUNT = 10;
export const MAX_COMMENT_COUNT = 10;
export const MAX_OFFER_IMAGES_COUNT = 6;
export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export const NEARBY_COUNT = 3;
export const DEFAULT_LOCATION = 'Paris';
export const DEFAULT_SORTING = 'Popular';
export const DEFAULT_VALUE_NULL = 0;
export const RATING_NUMBERS = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};
export const LOCATIONS_NAME: string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];
type TCity = {
  name: string;
  location: Location;
};
export const CITIES_MAP: TCity[] = [
  {
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
    name: 'Paris',
  },
  {
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
    name: 'Cologne',
  },
  {
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
    name: 'Brussels',
  },
  {
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
    name: 'Amsterdam',
  },
  {
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
    name: 'Hamburg',
  },
  {
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
    name: 'Dusseldorf',
  },
];
export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
export enum NameSpace {
  Offers = 'offers',
  User = 'user',
  City = 'city',
}
export const enum LoadingStatus {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}

export enum IconSize {
  PlaceCardWidth = 18,
  PlaceCardHeight = 19,
  OfferCardWidth = 31,
  OfferCardHeight = 33,
}

export type IconConfig = {
  url: string;
  width: number;
  height: number;
  anchorX: number;
  anchorY: number;
};

export const defaultIconConfig: IconConfig = {
  url: 'img/pin.svg',
  width: 27,
  height: 39,
  anchorX: 13.5,
  anchorY: 40,
};

export const activeIconConfig: IconConfig = {
  url: 'img/pin-active.svg',
  width: 27,
  height: 39,
  anchorX: 13.5,
  anchorY: 40,
};

export const sortingOptions = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
