import { IReviewsMock } from '../interfaces/IReviews';
import cat1 from '../assets/cat1.png';
import cat2 from '../assets/cat2.png';
import cat3 from '../assets/cat3.png';
import cat4 from '../assets/cat4.png';
import cat5 from '../assets/cat5.png';
import cat6 from '../assets/cat6.png';
import cat7 from '../assets/cat7.png';
import cat8 from '../assets/cat8.png';
export const reviewsMock: IReviewsMock[] = [
  {
    id: 1,
    user: 'Max',
    avatar: `${cat1}`,
    rating: 80,
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    time: '2019-04-24',
    idPlace: 1,
  },
  {
    id: 2,
    user: 'Thomas',
    avatar: `${cat2}`,
    rating: 90,
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    time: '2019-07-05',
    idPlace: 1,
  },
  {
    id: 3,
    user: 'Pol',
    avatar: `${cat3}`,
    rating: 50,
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    time: '2020-12-13',
    idPlace: 2,
  },
  {
    id: 4,
    user: 'Andrey',
    avatar: `${cat4}`,
    rating: 60,
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    time: '2020-12-13',
    idPlace: 2,
  },
  {
    id: 5,
    user: 'Harry',
    avatar: `${cat5}`,
    rating: 60,
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    time: '2020-12-13',
    idPlace: 3,
  },
  {
    id: 6,
    user: 'Charlie',
    avatar: `${cat6}`,
    rating: 100,
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    time: '2020-12-13',
    idPlace: 3,
  },
  {
    id: 7,
    user: 'Oliver',
    avatar: `${cat7}`,
    rating: 60,
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    time: '2020-12-13',
    idPlace: 4,
  },
  {
    id: 8,
    user: 'Jacob',
    avatar: `${cat8}`,
    rating: 70,
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    time: '2020-12-13',
    idPlace: 4,
  },
];
