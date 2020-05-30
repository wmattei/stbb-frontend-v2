import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Home from '@material-ui/icons/Home';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { UserRoleEnum } from '../../constants/types';
import { getCurrentUser } from '../../store/selectors/authSelector';
import GroupIcon from '@material-ui/icons/Group';

export default function Footer() {
    const history = useHistory();
    const route = useLocation();
    const currentUser = useSelector(getCurrentUser);

    const renderStudentButtons = () => {
        return (
            <BottomNavigation
                value={route.pathname}
                onChange={(event, newValue) => {
                    history.push(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction
                    value="/subjects"
                    label="Asignaturas"
                    icon={
                        <LibraryBooks
                            style={{
                                color:
                                    route.pathname !== '/subjects'
                                        ? 'black'
                                        : '#0277BD',
                            }}
                        />
                    }
                />
                {/* <BottomNavigationAction
                    value="/"
                    label="Home"
                    icon={<Home />}
                /> */}
                <BottomNavigationAction
                    value="/profile"
                    label="Mi cuenta"
                    icon={
                        <AccountCircleIcon
                            style={{
                                color:
                                    route.pathname !== '/profile'
                                        ? 'black'
                                        : '#0277BD',
                            }}
                        />
                    }
                />
            </BottomNavigation>
        );
    };

    const renderTeacherButtons = () => {
        return (
            <BottomNavigation
                value={route.pathname}
                onChange={(event, newValue) => {
                    history.push(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction
                    value="/"
                    label="Home"
                    icon={
                        <Home
                            style={{
                                color:
                                    route.pathname !== '/'
                                        ? 'black'
                                        : '#0277BD',
                            }}
                        />
                    }
                />
                <BottomNavigationAction
                    value="/profile"
                    label="Mi cuenta"
                    icon={
                        <AccountCircleIcon
                            style={{
                                color:
                                    route.pathname !== '/profile'
                                        ? 'black'
                                        : '#0277BD',
                            }}
                        />
                    }
                />
            </BottomNavigation>
        );
    };

    const renderAdminButtons = () => {
        return (
            <BottomNavigation
                value={route.pathname}
                onChange={(event, newValue) => {
                    history.push(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction
                    value="/"
                    label="Home"
                    icon={
                        <Home
                            style={{
                                color:
                                    route.pathname !== '/'
                                        ? 'black'
                                        : '#0277BD',
                            }}
                        />
                    }
                />
                <BottomNavigationAction
                    value="/subjects"
                    label="Asignaturas"
                    icon={
                        <LibraryBooks
                            style={{
                                color:
                                    route.pathname !== '/subjects'
                                        ? 'black'
                                        : '#0277BD',
                            }}
                        />
                    }
                />

                <BottomNavigationAction
                    value="/students"
                    label="Alumnos"
                    icon={
                        <GroupIcon
                            style={{
                                color:
                                    route.pathname !== '/students'
                                        ? 'black'
                                        : '#0277BD',
                            }}
                        />
                    }
                />
                <BottomNavigationAction
                    value="/profile"
                    label="Mi cuenta"
                    icon={
                        <AccountCircleIcon
                            style={{
                                color:
                                    route.pathname !== '/profile'
                                        ? 'black'
                                        : '#0277BD',
                            }}
                        />
                    }
                />
            </BottomNavigation>
        );
    };

    switch (currentUser.role) {
        case UserRoleEnum.STUDENT:
            return renderStudentButtons();
        case UserRoleEnum.TEACHER:
            return renderTeacherButtons();
        case UserRoleEnum.ADMIN:
            return renderAdminButtons();

        default:
            return <div></div>;
    }
}
