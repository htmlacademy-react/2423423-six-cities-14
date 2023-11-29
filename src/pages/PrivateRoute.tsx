import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../consts/consts';
import { useAppSelector } from '../types/store';
import { AppRoute } from '../consts/route';

type PrivateRouteProps = {
  children: JSX.Element;
};

export default function PrivateRoute(props: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );
  const { children } = props;
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
