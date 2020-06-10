import React, { useState, useEffect } from 'react';
import styles from './styles';
import {
    withStyles,
    useTheme,
    useMediaQuery,
    Box,
    IconButton,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Avatar,
} from '@material-ui/core';
import ItemsCarousel from 'react-items-carousel';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { UserApi } from '../../api/userApi';
type SiteTeachersProps = {
    classes: any;
};

function SiteTeachers({ classes }: SiteTeachersProps) {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [teachers, setTeachers] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        UserApi.getTeachers().then(setTeachers);
    }, []);

    return (
        <Box p={6}>
            <Box p={3} display="flex" width="100%" justifyContent="center">
                <b>Profesores</b>
            </Box>
            <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={isMobile ? 1 : 5}
                gutter={20}
                leftChevron={
                    <IconButton>
                        <ChevronLeftIcon />
                    </IconButton>
                }
                rightChevron={
                    <IconButton>
                        <ChevronRightIcon />
                    </IconButton>
                }
                outsideChevron
                chevronWidth={40}
            >
                {teachers.map((teacher: any) => (
                    <Card style={{ marginBottom: 15 }}>
                        {/* <CardActionArea> */}
                        <Avatar
                            variant="square"
                            className={classes.avatar}
                            src={teacher.avatar}
                        />
                        <Box
                            display="flex"
                            width="100%"
                            p={2}
                            justifyContent="center"
                        >
                            <b style={{ fontSize: 18 }}>{teacher.name}</b>
                        </Box>
                        {/* </CardActionArea> */}
                    </Card>
                ))}
            </ItemsCarousel>
        </Box>
    );
}

export default withStyles(styles)(SiteTeachers);
