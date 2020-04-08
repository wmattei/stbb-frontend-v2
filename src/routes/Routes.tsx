import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeView from '../containers/Home/HomeView';
import PageShell from '../containers/Layout/PageShell';
import SubjectView from '../containers/Subject/SubjectView';
import DocumentView from '../containers/Document/DocumentView';

export default function Routes() {
    return (
        <Switch>
            <div className="App">
                <Route exact path="/" component={PageShell(HomeView)}></Route>
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
