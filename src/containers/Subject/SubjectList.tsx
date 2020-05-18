import React, { useState } from 'react';
import styles from './styles';
import {
    withStyles,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    List,
    ListItem,
    ListItemIcon,
    Box,
    ListItemText,
    useTheme,
    Card,
    CircularProgress,
} from '@material-ui/core';
import { Subject, UserRoleEnum } from '../../constants/types';
import { useHistory } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PeopleIcon from '@material-ui/icons/People';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/selectors/authSelector';

type SubjectListProps = {
    classes: any;
    subjects: Subject[];
    isLoading: any;
};

function SubjectList({ classes, subjects, isLoading }: SubjectListProps) {
    const history = useHistory();
    const [expandedSubject, setExpandedSubject] = useState<String | undefined>(
        undefined
    );

    const currentUser = useSelector(getCurrentUser);

    const isStudent = currentUser.role === UserRoleEnum.STUDENT;

    const theme = useTheme();

    const handleClickSingleClass = (subject) => {
        if (subject.classes.length === 1) {
            history.push(`/class/${subject.classes[0].id}`);
        }
    };

    const getColor = (subject: any) => {
        const c = subject.classes[0];

        if (!isStudent) return '#def0ff';
        if (c.validated || c.grade >= 2) return '#a5e8a5cf';
        if (!c.validated && (c.grade === null || c.grade === undefined))
            return '#def0ff';
        if ((!c.grade || c.grade < 2) && !c.validated) return '#ffa7a7';
        else return '#def0ff';
    };

    const getGrade = (subject) => {
        const c = subject.classes[0];
        if (c.validated) return `Calificación: Validado por otra institución`
        if (c.grade >= 2) return `Calificación: ${c.grade} - Aprobado`;
        if ((c.grade === null || c.grade === undefined))
            return 'A cursar';
        if (!c.grade || c.grade < 2) return `Calificación: ${c.grade} - Reprobado`
    };

    const renderSubjectCard = (subject: any, index) => {
        return (
            <ExpansionPanel
                className={classes.subjectCard}
                style={{ background: getColor(subject) }}
                expanded={expandedSubject === subject.id}
                onChange={() =>
                    setExpandedSubject((id) =>
                        id === subject.id ? undefined : subject.id
                    )
                }
                key={index}
            >
                <ExpansionPanelSummary
                    expandIcon={<ArrowForwardIcon />}
                    onClick={() => handleClickSingleClass(subject)}
                >
                    <Box display="flex" flexDirection="column">
                        <Typography>{subject.name}</Typography>
                        <Typography style={{ color: 'gray' }}>
                            ({subject.classes[0].teacher.name})
                        </Typography>
                        {isStudent && (
                            <Typography>
                                {getGrade(subject)}
                            </Typography>
                        )}
                    </Box>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails classes={{ root: classes.expansion }}>
                    <List component="nav" style={{ width: '100%' }}>
                        {subject.classes.map((c) => (
                            <ListItem
                                key={c.id}
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
                                        {c.students && (
                                            <Typography
                                                variant="body2"
                                                style={{
                                                    color:
                                                        theme.palette.text.hint,
                                                }}
                                            >
                                                {c.students.length} alumno(s)
                                            </Typography>
                                        )}
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

    if (subjects.length && !isLoading)
        return <Box p={2}>{subjects.map(renderSubjectCard)}</Box>;
    if (!subjects.length && !isLoading)
        return (
            <NotFound
                message="Ninguna asignatura encontrada!"
                color="#ffc28e"
                textColor="#44382f"
            />
        );
    return (
        <Box p={3} width="100%" display="flex" justifyContent="center">
            <Card style={{ width: '100%' }}>
                <Box p={3} display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            </Card>
        </Box>
    );
}

export default withStyles(styles)(SubjectList);
