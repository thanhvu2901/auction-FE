import { FC, useEffect } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';

interface Props extends RouteProps { }

const DefaultRoute: FC<Props> = (props: Props) => {
    const { path, exact, strict, component } = props;

    // const history = useHistory();

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [history.location]);

    return (
        <Route path={path} exact={exact} strict={strict} component={component} />
    );
};

export default DefaultRoute;
