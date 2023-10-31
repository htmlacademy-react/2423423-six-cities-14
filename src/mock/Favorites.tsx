import { IFavoritesMock } from '../interfaces/Favorites';

export const favoritesMock: IFavoritesMock[] = [
  {
    id: 1,
    mark: 'Premium',
    imgUrl: 'img/apartment-small-03.jpg',
    price: 180,
    isBookmarks: true,
    rating: 100,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    location: 'Amsterdam',
  },
  {
    id: 2,
    mark: 'Premium',
    imgUrl: 'img/room-small.jpg',
    price: 80,
    isBookmarks: true,
    rating: 80,
    name: 'Wood and stone place',
    type: 'Room',
    location: 'Amsterdam',
  },
  {
    id: 2,
    mark: '',
    imgUrl: 'img/apartment-small-04.jpg',
    price: 180,
    isBookmarks: true,
    rating: 100,
    name: 'White castlee',
    type: 'Apartment',
    location: 'Cologne',
  },
];
