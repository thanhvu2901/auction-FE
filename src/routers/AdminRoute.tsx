import { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import DefaultRoute from './DefaultRoute';

interface Props extends RouteProps { }

const AdminRoute: FC<Props> = (props: Props) => {
  const { path, exact, strict, component } = props;

  const accessToken = localStorage.getItem('auction-user-token');
  const role = localStorage.getItem('auction-user-role')
  const hasAccess = role === 'admin' && accessToken;

  return hasAccess ? (
    <DefaultRoute path={path} exact={exact} strict={strict} component={component} />
  ) : (
    <Redirect to={`/`} />
  );
};

export default AdminRoute;
