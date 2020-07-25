import React from 'react';
import styles from './styles';
import {
    withStyles,
    Box,
    Button,
    useMediaQuery,
    useTheme,
    IconButton,
    Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

type SiteHeaderProps = {
    classes: any;
    toggleVision: any;
    toggleMision: any;
};

function SiteHeader({ classes, toggleVision, toggleMision }: SiteHeaderProps) {
    const history = useHistory();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box
            p={2}
            className={classes.header}
            display="flex"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
        >
            <Box display="flex" flexDirection="row" alignItems="center">
                <img
                    width={100}
                    height={90}
                    src="/assets/images/logo_simple.png"
                    alt="STBB"
                />
                <div style={{ marginLeft: 30 }}>
                    <Typography className={classes.appTitle}>
                        S.T.B.B
                    </Typography>
                    <span style={{ color: 'white' }}>
                        Seminario Teológico Bautista Betel
                    </span>
                </div>
            </Box>
            <Box
                display="flex"
                mr={4}
                width="30%"
                justifyContent="flex-end"
                flexDirection={isMobile ? 'column' : 'row'}
            >
                <a
                    href="https://www.facebook.com/stbb.seminarioteologicobetel/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        style={{ marginRight: 10 }}
                        src="https://imagens.canaltech.com.br/empresas/644.400.jpg"
                        alt="Facebook"
                        width={30}
                        height={30}
                    />
                </a>
                <Button onClick={toggleMision} className={classes.white}>
                    Misión
                </Button>
                <Button onClick={toggleVision} className={classes.white}>
                    Visión
                </Button>
                <Button
                    onClick={() => history.push('/auth/login')}
                    className={classes.white}
                >
                    LOGIN
                </Button>
            </Box>
        </Box>
    );
}

export default withStyles(styles)(SiteHeader);
