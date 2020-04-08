import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';

type HomeProps = {
    classes: {};
};

function Test({ classes }: HomeProps) {
    return <p>Test</p>;
}

export default withStyles(styles)(Test);
