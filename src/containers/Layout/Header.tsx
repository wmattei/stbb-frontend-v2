import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

export default function Header() {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography style={{ flexGrow: 1 }} variant="h6">
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}
