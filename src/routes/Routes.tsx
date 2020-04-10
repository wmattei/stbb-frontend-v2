import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Login } from '../containers/Auth/Login';
import DocumentView from '../containers/Document/DocumentView';
import HomeView from '../containers/Home/HomeView';
import PageShell from '../containers/Layout/PageShell';
import { SiteView } from '../containers/Site/SiteView';
import SubjectView from '../containers/Subject/SubjectView';
import { useSelector } from 'react-redux';
import { checkIsAuthenticated } from '../store/selectors/authSelector';
import AuthShell from '../containers/Auth/AuthShell';
import { RestorePassword } from '../containers/Auth/RestorePassword';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector(checkIsAuthenticated);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default function Routes() {
    return (
        <Switch>
            <div className="App">
                <Route exact path="/login" component={AuthShell(Login)}></Route>
                <Route exact path="/restore-password" component={AuthShell(RestorePassword)}></Route>
                <Route exact path="/site" component={SiteView}></Route>

                <PrivateRoute
                    exact
                    path="/"
                    component={PageShell(HomeView)}
                ></PrivateRoute>
                <Route
                    exact
                    path="/subjects"
                    component={PageShell(SubjectView)}
                ></Route>
                <Route
                    exact
                    path="/documents"
                    component={PageShell(DocumentView)}
                ></Route>
            </div>
        </Switch>
    );
}
