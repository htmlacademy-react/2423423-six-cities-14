import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../consts/consts';
import { AppRoute } from '../../consts/route';
import { useAppSelector } from '../../types/store';

type RedirectToMainRouteProps = {
  children: JSX.Element;
};

function RedirectToMain({ children }: RedirectToMainRouteProps) {
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );
  return authorizationStatus !== AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Root} />
  );
}

export default RedirectToMain;
