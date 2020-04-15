import React from 'react';
import { Card, Box } from '@material-ui/core';

type NotFoundProps = {
    message?: string;
    color?: string;
    textColor?: string;
};

function NotFound({
    message = 'Ningún resultado encontrado',
    color = '#fff',
    textColor = '#000',
}: NotFoundProps) {
    return (
        <Box p={2}>
            <Card style={{ background: color, padding: 20, color: textColor }}>
                {message}
            </Card>
        </Box>
    );
}

export default NotFound;
