import React from 'react';
import { Box, Card } from '@material-ui/core';

export default function SiteContact() {
    return (
        <Box
            display="flex"
            alignItems="center"
            p={6}
            ml={3}
            flexDirection="column"
        >
            <b>Contacto y matriculas</b>
            <Card style={{ marginTop: 12 }}>
                <Box p={4}>
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignContent="center"
                    >
                        <img
                            width={20}
                            height={20}
                            style={{ marginRight: 8 }}
                            alt=""
                            src="/assets/images/whatsapp.png"
                        />
                        <b>+595 971 835923</b>
                    </Box>
                    <Box
                        mt={2}
                        display="flex"
                        flexDirection="row"
                        alignContent="center"
                    >
                        <img
                            width={20}
                            height={20}
                            style={{ marginRight: 8 }}
                            alt=""
                            src="/assets/images/gmail.png"
                        />
                        <b>pr.miltonmattei@gmail.com</b>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}
