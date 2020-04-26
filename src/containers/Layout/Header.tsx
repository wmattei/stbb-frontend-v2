import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    IconButton,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/actions/authActions';
import { getTitle, getShowBackButton } from '../../store/selectors/appSelector';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const title = useSelector(getTitle);
    const showBackButton = useSelector(getShowBackButton);

    useEffect(() => {
        document.title = title;
    }, [title]);

    const logOut = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        history.push('/auth/login');
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                {showBackButton && (
                    <IconButton onClick={() => history.goBack()}>
                        <ArrowBackIcon style={{ color: 'white' }} />
                    </IconButton>
                )}
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
