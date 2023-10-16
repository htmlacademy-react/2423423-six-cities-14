import Main from './components/pages/Main';
import { IPlaces } from './interfaces/IPlaces';

export default function App() {
  const places: IPlaces[] = [
    {
      id: 1,
      mark: 'Premium',
      imgUrl: 'img/apartment-01.jpg',
      price: 120,
      isBookmarks: false,
      rating: 80,
      name: 'Beautiful &amp; luxurious apartment at great location',
      type: 'Apartment',
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
    },
    {
      id: 5,
      mark: '',
      imgUrl: 'img/room.jpg',
      price: 80,
      isBookmarks: true,
      rating: 80,
      name: 'Wood and stone place',
      type: 'Room',
    },
  ];
  return (
    <div>
      <Main places={places}/>
    </div>
  );
}
