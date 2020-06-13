import { createStyles } from '@material-ui/core';

const styles = createStyles({
    header: {
        background: '#0277bd',
    },
    white: {
        color: 'white',
    },
    image: {
        objectFit: 'fill',
    },
    carouselItemVision: {
        backgroundImage: `url('/assets/images/book.jpg')`,
        height: 500,
        backgroundSize: 'cover',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
    },
    carouselItemMision: {
        backgroundImage: `url('/assets/images/book-2.jpg')`,
        height: 500,
        backgroundSize: 'cover',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
    },
    card: {
        backdropFilter: 'blur(2px)',
        background: '#fff9',
        width: '80%',
    },
    title: {
        fontSize: 24,
        marginBottom: 10
    },
    avatar: {
        width: '100%',
        height: 250
    },
    closedCard: {
        color: 'white',
        backdropFilter: 'none',
        width: '80%',
        background: 'transparent',
        boxShadow: 'none'
    },
    appTitle: {
        color: 'white',
        fontSize: 40,
    }
});

export default styles;
