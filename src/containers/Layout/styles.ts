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
        borderTopColor: '#cecece',
        borderTopStyle: 'solid',
        borderTopWidth: 1,
        height: 55,
        zIndex: 1,
    },
});

export default styles;
