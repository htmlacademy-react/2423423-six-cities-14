import { IPlaces } from '../interfaces/IPlaces';

export const placesMock: IPlaces[] = [
  {
    id: 1,
    mark: 'Premium',
    imgUrl: 'img/apartment-01.jpg',
    price: 120,
    isBookmarks: false,
    rating: 80,
    name: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    title: 'Amsterdam',
    lat: 52.3909553943508,
    lng: 4.85309666406198,
    zoom: 10,
  },
  {
    id: 2,
    mark: '',
    imgUrl: 'img/room.jpg',
    price: 80,
    isBookmarks: true,
    rating: 80,
    name: 'Wood and stone place',
    type: 'Room',
    title: 'Amsterdam',
    lat: 52.3609553943508,
    lng: 4.85309666406198,
    zoom: 10,
  },
  {
    id: 3,
    mark: '',
    imgUrl: 'img/apartment-02.jpg',
    price: 132,
    isBookmarks: false,
    rating: 80,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
    title: 'Amsterdam',
    lat: 52.3909553943508,
    lng: 4.929309666406198,
    zoom: 10,
  },
  {
    id: 4,
    mark: 'Premium',
    imgUrl: 'img/apartment-03.jpg',
    price: 180,
    isBookmarks: false,
    rating: 100,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    title: 'Amsterdam',
    lat: 52.3809553943508,
    lng: 4.939309666406198,
    zoom: 10,
  },

];
