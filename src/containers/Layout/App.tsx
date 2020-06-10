import {
    MuiThemeProvider,
    withStyles,
    StylesProvider,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { checkIsAuthenticated } from '../../store/selectors/authSelector';
import Footer from './Footer';
import Header from './Header';
import styles from './styles';
import theme from './theme';

type AppProps = {
    children: any;
    classes: any;
};

function App({ children, classes }: AppProps) {
    const isAuthenticated = useSelector(checkIsAuthenticated);
    return (
        <Router>
            <MuiThemeProvider theme={theme}>
                <div className={classes.fill}>
                    {isAuthenticated && (
                        <header className={classes.header}>
                            <Header />
                        </header>
                    )}
                    <main
                        style={
                            isAuthenticated
                                ? { marginTop: 60, marginBottom: 55 }
                                : { height: '100vh' }
                        }
                        className={classes.content}
                    >
                        {children}
                    </main>
                    {isAuthenticated && (
                        <footer className={classes.footer}>
                            <Footer></Footer>
                        </footer>
                    )}
                </div>
            </MuiThemeProvider>
        </Router>
    );
}

export default withStyles(styles)(App);
