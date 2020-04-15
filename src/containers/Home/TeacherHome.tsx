import {
    Box,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    withStyles,
    useTheme,
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PeopleIcon from '@material-ui/icons/People';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';
import ClassApi from '../../api/classApi';
import NotFound from '../../components/NotFound';
import { Class, User } from '../../constants/types';
import styles from './styles';

type HomeProps = {
    classes: any;
    teacher: User;
};

function TeacherHome({ classes, teacher }: HomeProps) {
    const history = useHistory();
    const theme = useTheme();
    const [subjects, setSubjects] = useState([]);
    const [expandedSubject, setExpandedSubject] = useState<String | undefined>(
        undefined
    );

    useEffect(() => {
        trackPromise(ClassApi.findByTeacher(teacher.id).then(mapSubjects));
    }, [teacher]);

    const mapSubjects = (classes: Class[]) => {
        const subIds = _.uniqBy(classes.map((c) => c.subject.id));
        setSubjects(
            subIds.map((subId) => {
                return {
                    ...classes.find((c) => c.subject.id === subId)?.subject,
                    classes: classes.filter((c) => c.subject.id === subId),
                };
            })
        );
    };

    const renderSubjectCard = (subject: any, index) => {
        return (
            <ExpansionPanel
                className={classes.subjectCard}
                expanded={expandedSubject === subject.id}
                onChange={() =>
                    setExpandedSubject((id) =>
                        id === subject.id ? undefined : subject.id
                    )
                }
                key={index}
            >
                <ExpansionPanelSummary expandIcon={<ArrowForwardIcon />}>
                    <Typography>{subject.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails classes={{ root: classes.expansion }}>
                    <List component="nav" style={{ width: '100%' }}>
                        {subject.classes.map((c) => (
                            <ListItem
                                button
                                style={{ width: '100%' }}
                                onClick={() => history.push(`/class/${c.id}`)}
                            >
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <Box
                                    display="flex"
                                    flexGrow={1}
                                    width="100%"
                                    justifyContent="space-between"
                                >
                                    <ListItemText primary={c.name} />
                                    <Box display="flex">
                                        <Typography
                                            variant="body2"
                                            style={{
                                                color: theme.palette.text.hint,
                                            }}
                                        >
                                            {c.students.length} alumno(s)
                                        </Typography>
                                        <ArrowForwardIcon />
                                    </Box>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    };

    console.log(theme);
    return subjects.length ? (
        <Box p={2}>{subjects.map(renderSubjectCard)}</Box>
    ) : (
        <NotFound
            message="Ninguna asignatura encontrada!"
            color="#ffc28e"
            textColor="#44382f"
        />
    );
}

export default withStyles(styles)(TeacherHome as any);
