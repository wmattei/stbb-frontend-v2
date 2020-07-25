import React, { useState } from 'react';
import SiteHeader from './SiteHeader';
import SiteVisionMision from './SiteVisionMision';
import { Box } from '@material-ui/core';
import SiteHistory from './SiteHistory';
import SiteTeachers from './SiteTeachers';
import SiteSubject from './SiteSubject';
import SiteContact from './SiteContact';

export function SiteView() {
    const [openVision, setOpenVision] = useState(false);
    const [openMision, setOpenMision] = useState(false);

    return (
        <div>
            <SiteHeader
                toggleVision={() => {
                    setOpenVision(!openVision);
                    setOpenMision(false);
                }}
                toggleMision={() => {
                    setOpenMision(!openMision);
                    setOpenVision(false);
                }}
            />
            <Box style={{ height: 500 }}>
                <SiteVisionMision
                    openVision={openVision}
                    openMision={openMision}
                />
                <SiteHistory />
                <SiteTeachers />
                <SiteContact />
                <SiteSubject />
            </Box>
        </div>
    );
}
