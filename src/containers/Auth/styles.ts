import { createStyles } from '@material-ui/core';

const styles = createStyles({
    fill: {
        position: 'relative',
        overflowX: 'hidden',
    },
    footer: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: 55,
    },
    link: {
        cursor: 'pointer',
        fontSize: 12,
        textDecoration: 'underline',
        color: 'blue',
    },
});

export default styles;
