import React, { useState } from 'react';
import styles from './styles';
import { withStyles, Box, Card } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

type SiteVisionProps = {
    classes: any;
    openVision: any;
    openMision: any;
};

function SiteVisionMision({
    classes,
    openVision,
    openMision,
}: SiteVisionProps) {
    return (
        <div className={classes.carouselItemVision}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="50%"
            >
                <Card
                    className={openVision || openMision ? classes.card : classes.closedCard}
                >
                    <Box
                        p={4}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Collapse in={openVision}>
                            <span>
                                Líderes formados que contribuyen a la expansión
                                del Reino a través de un ministerio integral
                            </span>
                        </Collapse>
                        <Collapse in={openMision}>
                            <span>
                                Ofrecer un programa integral en el cual el
                                alumno/a se desarrolla en las áreas:
                                eclesiástica social y laboral a fin de ser capaz
                                de cumplir eficientemente con su llamado.
                            </span>
                        </Collapse>
                    </Box>
                </Card>
            </Box>
        </div>
    );
}

export default withStyles(styles)(SiteVisionMision);
