import Header from '../Header/Header';
import dino from '../../assets/Dino.png';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      className="page page--gray page--notFound"
      style={{ textAlign: 'center' }}
    >
      <Header />
      <img src={dino} alt="dino photo page not found" width={400} />
      <h1>Page not found </h1>
      <Link to="/">Go to main page</Link>
    </div>
  );
}
