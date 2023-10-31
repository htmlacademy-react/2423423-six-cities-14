import Favorites from './Favorites';
import Login from './Login';

interface IPrivateRouteProps {
  isAuthorized: boolean;
}

export default function PrivateRoute({ isAuthorized }: IPrivateRouteProps) {
  return (
    <div className="page page--gray page--privateRoute">
      {!isAuthorized ? <Login /> : <Favorites />}
    </div>
  );
}
