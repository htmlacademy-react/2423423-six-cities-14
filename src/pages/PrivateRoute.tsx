import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../consts/consts';
import { useAppSelector } from '../types/store';
import { AppRoute } from '../consts/route';

type PrivateRouteProps = {
  children: JSX.Element;
};

export default function PrivateRoute({children}: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );

  return authorizationStatus === AuthorizationStatus.NoAuth ? (
    <Navigate to={AppRoute.Login} />
  ) : (
    children
  );
}
