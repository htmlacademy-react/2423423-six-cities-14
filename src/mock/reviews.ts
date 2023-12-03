import { Comment } from '../types/comment';


const reviewMocks: Comment[] = [
  {
    id: 1,
    user: {
      id: 15,
      isPro: true,
      name: 'Kendall',
      avatarUrl: 'https://14.react.pages.academy/static/avatar/6.jpg'
    },
    rating: 5,
    comment: 'Home is amazing. Its like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2023-09-02T09:23:20.316Z'
  },

  {
    id: 2,
    user: {
      id: 14,
      isPro: false,
      name: 'Kenhjjjjdall',
      avatarUrl: 'https://14.react.pages.academy/static/avatar/5.jpg'
    },
    rating: 4,
    comment: 'Home is amazing. Its like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2023-10-02T09:23:20.316Z'
  },

  {
    id: 3,
    user: {
      id: 16,
      isPro: false,
      name: 'Kenhjjjjdall',
      avatarUrl: 'https://14.react.pages.academy/static/avatar/3.jpg'
    },
    rating: 3,
    comment: 'Home is amazing. Its like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2023-11-02T09:23:20.316Z'
  },

  {
    id: 4,
    user: {
      id: 12,
      isPro: true,
      name: 'Kenhjjjjdall',
      avatarUrl: 'https://14.react.pages.academy/static/avatar/1.jpg'
    },
    rating: 2,
    comment: 'he house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
    date: '2023-12-02T09:23:20.316Z'
  }
];


const reviewMock = {
  id: '1',
  user: {
    id: 15,
    isPro: true,
    name: 'Kendall',
    avatarUrl: 'https://14.react.pages.academy/static/avatar/6.jpg'
  },
  rating: 5,
  comment: 'Home is amazing. Its like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
  date: '2023-09-02T09:23:20.316Z'
};

export {reviewMocks,reviewMock};
