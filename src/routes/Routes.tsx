import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthShell from '../containers/Auth/AuthShell';
import Login from '../containers/Auth/Login';
import RestorePassword from '../containers/Auth/RestorePassword';
import { SiteView } from '../containers/Site/SiteView';
import Root from '../containers/Layout/Root';
import ResetPassword from '../containers/Auth/ResetPassword';

export default function Routes() {
    return (
        <Switch>
            <div className="App">
                <Route
                    exact
                    path="/auth/login"
                    component={AuthShell(Login)}
                ></Route>
                <Route
                    exact
                    path="/auth/restore-password"
                    component={AuthShell(RestorePassword)}
                ></Route>
                <Route
                    exact
                    path="/auth/reset-password/:token"
                    component={AuthShell(ResetPassword)}
                ></Route>
                <Route exact path="/site" component={SiteView}></Route>

                <Route path="/portal" component={Root}></Route>
                <Route exact path="/" component={SiteView}></Route>
            </div>
        </Switch>
    );
}
