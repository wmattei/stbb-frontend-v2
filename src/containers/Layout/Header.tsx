import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/actions/authActions';

export default function Header() {
    const dispatch = useDispatch();
    const history = useHistory();

    const logOut = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography style={{ flexGrow: 1 }} variant="h6">
                    STBB
                </Typography>
                <Button onClick={logOut} color="inherit">
                    LOGOUT
                </Button>
            </Toolbar>
        </AppBar>
    );
}
