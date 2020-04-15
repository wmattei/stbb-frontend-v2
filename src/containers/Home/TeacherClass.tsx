import React, { useEffect } from 'react';
import styles from './styles';
import { withStyles, Typography, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../store/actions/appActions';
import AlertCard from '../../components/AlertCard';
import InfoIcon from '@material-ui/icons/Info';

type TeacherSubjectProps = {
    classes: any;
};

function TeacherClass({ classes }: TeacherSubjectProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('asasdd'));

        return () => {
            dispatch(setTitle('STBB'));
        };
        // eslint-disable-next-line
    }, []);

    return (
        <Box p={3}>
            <AlertCard
                backgroundColor="#feb32a40"
                iconBgColor="#ffb32a"
                icon={<InfoIcon color="disabled" />}
            >
                <Typography>
                    Este es su aula, use este entorno para proporcionar
                    materiales y responder preguntas de sus alumnos
                </Typography>
            </AlertCard>
        </Box>
    );
}

export default withStyles(styles)(TeacherClass);
