import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Box } from '@material-ui/core';

const style = {
    backgroundImage: 'url("assets/images/pwa-bg.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 'center',
    backgroundSize: '100% 100%',
    height: '100vh',
};

const AuthShell = (Page: any) => {
    return (props: any) => (
        <div style={style}>
            <Box display="flex" flexGrow={1} justifyContent="center">
                <img
                    width={200}
                    alt="logo"
                    src="assets/images/logo_simple.png"
                />
            </Box>
            <div style={{ margin: 24, marginTop: 80 }}>
                <ReactCSSTransitionGroup
                    transitionAppear={true}
                    transitionAppearTimeout={600}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={200}
                    transitionName="SlideIn"
                >
                    <Page {...props} />
                </ReactCSSTransitionGroup>
            </div>
        </div>
    );
};

export default AuthShell;
