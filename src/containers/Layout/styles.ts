import { createStyles } from '@material-ui/core';

const styles = createStyles({
    fill: {
        position: 'relative',
        height: 'calc(100vh)',
        background: 'red',
        overflowX: 'hidden',
        overflowY: 'scroll'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 30
    }
});

export default styles;
