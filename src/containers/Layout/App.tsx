import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, withStyles } from '@material-ui/core';
import theme from './theme';
import styles from './styles';
import Footer from './Footer';
import Header from './Header';

type AppProps = {
    children: any;
    classes: any;
};

function App({ children, classes }: AppProps) {
    return (
        <Router>
            <MuiThemeProvider theme={theme}>
                <div className={classes.fill}>
                    <header>
                        <Header />
                    </header>
                    <main className={classes.content}>{children}</main>
                    <footer className={classes.footer}>
                        <Footer></Footer>
                    </footer>
                </div>
            </MuiThemeProvider>
        </Router>
    );
}

export default withStyles(styles)(App);
