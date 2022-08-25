import { FC, useEffect } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import DefaultRoute from './DefaultRoute';

interface Props extends RouteProps { }

const PublicRoute: FC<Props> = (props: Props) => {
  const { path, exact, strict, component } = props;

  return (
    <DefaultRoute path={path} exact={exact} strict={strict} component={component} />
  );
};

export default PublicRoute;
