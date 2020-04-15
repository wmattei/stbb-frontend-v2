import React from 'react';
import { Box } from '@material-ui/core';

type AlertCardProps = {
    backgroundColor: string;
    icon?: any;
    iconBgColor?: string;
    children?: any;
};

function AlertCard({
    backgroundColor,
    icon,
    children,
    iconBgColor,
}: AlertCardProps) {
    return (
        <Box display="flex"  flexDirection="row">
            <Box
                display="flex"
                alignItems="center"
                style={{
                    backgroundColor: iconBgColor,
                    padding: 10,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                }}
            >
                {icon}
            </Box>
            <Box
                style={{
                    padding: 10,
                    backgroundColor,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                }}
                display="flex"
                flexGrow={1}
            >
                {children}
            </Box>
        </Box>
    );
}

export default AlertCard;
