import { PageURL } from 'enum/PageURL';
import { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import DefaultRoute from './DefaultRoute';

interface Props extends RouteProps {}

const PrivateRoute: FC<Props> = (props: Props) => {
  const { path, exact, strict, component, location } = props;

  const accessToken = localStorage.getItem('auction-user-token');
  const hasAccess = accessToken !== null;

  return hasAccess ? (
    <DefaultRoute path={path} exact={exact} strict={strict} component={component} />
  ) : (
    <Redirect to={`${PageURL.Login}?next=${location?.pathname}`} />
  );
};

export default PrivateRoute;
