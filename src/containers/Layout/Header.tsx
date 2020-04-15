import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/actions/authActions';
import { getTitle } from '../../store/selectors/appSelector';

export default function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const title = useSelector(getTitle);
    useEffect(() => {
        document.title = title;
    }, [title]);

    const logOut = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography style={{ flexGrow: 1 }} variant="h6">
                    {title}
                </Typography>
                <Button onClick={logOut} color="inherit">
                    LOGOUT
                </Button>
            </Toolbar>
        </AppBar>
    );
}
