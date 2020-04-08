import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function Footer() {
    const history = useHistory();
    const route = useLocation();

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
                icon={<LibraryBooks />}
            />
            <BottomNavigationAction value="/" label="Home" icon={<Home />} />
            <BottomNavigationAction
                value="/documents"
                label="Documentos"
                icon={<InsertDriveFile />}
            />
        </BottomNavigation>
    );
}
