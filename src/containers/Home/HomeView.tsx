import { withStyles, Typography } from '@material-ui/core';
import React from 'react';
import styles from './styles';

type HomeProps = {
    classes: {};
};

function HomeView({ classes }: HomeProps) {
    return (
        <div style={{ height: 800 }}>
            <div>asdasdads</div>
        </div>
    );
}

export default withStyles(styles)(HomeView);
