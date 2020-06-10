import React, { useState, useEffect } from 'react';
import styles from './styles';
import { withStyles, Box } from '@material-ui/core';
import { Pie } from 'react-chartjs-2';
import { UserApi } from '../../api/userApi';

type SiteSubjectProps = {
    classes: any;
};

const COLORS = [
    'red',
    'green',
    'blue',
    'yellow',
    'orange',
    'brown',
    '#3c716a',
    '#21fa36',
    '#5719a5',
    '#b2008a',
    '#22e7d5',
    '#b696f1',
    '#4b1835',
    '#76c983',
    '#cdb233',
    '#993121',
    '#01055b',
    '#68dcda',
    '#b17352',
    '#7d8d39',
    '#6307ab',
    '#5bb73a',
    '#993964',
    '#f14eea',
    '#472e02',
    '#71ffc4',
    '#2fc3fe',
    '#418073',
    '#aa74a0',
    '#9a9e62',
    '#da9a71',
    '#be22b8',
    '#f4a639',
    '#867833',
    '#8a427a',
    '#75d94b',
    '#fe9608',
    '#d4bdc8',
    '#7781c8',
    '#39aeea',
    '#ff4a86',
    '#0872e8',
    '#bbf6a5',
    '#08dc98',
    '#fece06',
    '#c0f42f',
    '#4380d7',
    '#fbec79',
    '#4aaefa',
];

function SiteSubject({ classes }: SiteSubjectProps) {
    const [data, setData] = useState({});

    useEffect(() => {
        UserApi.getSubjects().then((res) => {
            setData({
                labels: res.map((subject) => subject.name),
                datasets: [
                    {
                        data: res.map((subject) => subject.credits),
                        backgroundColor: COLORS,
                    },
                ],
            });
        });
    }, []);

    return (
        <Box p={6}>
            <Box p={3} display="flex" width="100%" justifyContent="center">
                <b>Asignaturas</b>
            </Box>
            <Pie data={data} />
        </Box>
    );
}

export default withStyles(styles)(SiteSubject);
