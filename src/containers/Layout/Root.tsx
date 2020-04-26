import React, { useEffect } from 'react';
import PageShell from './PageShell';
import HomeView from '../Home/HomeView';
import { Route, useHistory, useLocation } from 'react-router-dom';
import SubjectView from '../Subject/SubjectView';
import AuthApi from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/actions/authActions';
import ClassRoom from '../Home/ClassRoom';
import Profile from '../User/Profile';

export default function Root() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const fetchMe = async () => {
            const result = await AuthApi.whoami();

            if (result.status === 200 && result.data) {
                dispatch(setCurrentUser(result.data.data));
            }

            if (result.status === 401) {
                history.replace('/login');
            }
        };

        if (location.pathname === '/login') return;
        fetchMe();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Route exact path="/" component={PageShell(HomeView)}></Route>
            <Route
                exact
                path="/class/:classId"
                component={PageShell(ClassRoom)}
            ></Route>
            <Route
                exact
                path="/subjects"
                component={PageShell(SubjectView)}
            ></Route>
            <Route
                exact
                path="/profile"
                component={PageShell(Profile)}
            ></Route>
        </div>
    );
}
