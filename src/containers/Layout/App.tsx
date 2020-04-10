import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, withStyles } from '@material-ui/core';
import theme from './theme';
import styles from './styles';
import Footer from './Footer';
import Header from './Header';
import { checkIsAuthenticated } from '../../store/selectors/authSelector';
import { useSelector } from 'react-redux';

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
                                : {}
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
