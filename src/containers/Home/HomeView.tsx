import { withStyles } from '@material-ui/core';
import React from 'react';
import styles from './styles';

type HomeProps = {
    classes: {};
};

function HomeView({ classes }: HomeProps) {
    return <div>Home</div>;
}

export default withStyles(styles)(HomeView);
