import Main from './components/pages/Main';
import { IPlaces } from './interfaces/IPlaces';
import { placesMock } from './mock/Places';

export default function App() {
  const places: IPlaces[] = placesMock;
  return (
    <div>
      <Main places={places} />
    </div>
  );
}
