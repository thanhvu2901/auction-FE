import  Admin  from "pages/admin";
import { PageURL } from "enum/PageURL";
import { HomePage, SearchPage, DetailItem } from "pages";
import loginItem from "pages/login";
import profileItem from "pages/profile";
import regItem from "pages/register";
import WatchListPage from "pages/watch-list";
import { useEffect } from "react";
import { Switch, useHistory } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { BrowserRouter as Router } from 'react-router-dom';

const RootRouter = () => {
    return (
        <Router>
            <Switch>
                <PublicRoute exact={true} path={PageURL.Home} component={HomePage} />
                <PublicRoute path={PageURL.Search} component={SearchPage} />
                <PublicRoute path={PageURL.Detail} component={DetailItem} />
                <PublicRoute path={PageURL.Login} component={loginItem} />
                <PublicRoute path={PageURL.Register} component={regItem} />
                <PrivateRoute path={PageURL.WatchList} component={WatchListPage} />
                <AdminRoute path={PageURL.Admin} component={Admin} />
                <PrivateRoute path={PageURL.Profile} component={profileItem} />
            </Switch>
        </Router >
    );
}

export default RootRouter;