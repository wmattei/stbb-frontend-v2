import React, { useEffect, useState } from 'react';
import styles from './styles';
import {
    withStyles,
    ExpansionPanel,
    ExpansionPanelSummary,
    Box,
    Typography,
    ExpansionPanelDetails,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme,
    Card,
    CircularProgress,
} from '@material-ui/core';
import Modal from '../../components/Modal';
import ClassApi from '../../api/classApi';
import _ from 'lodash';
import NotFound from '../../components/NotFound';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PeopleIcon from '@material-ui/icons/People';

type StudentHistoryProps = {
    classes: any;
    studentId: string;
    closeModel: any;
};

function StudentHistory({
    classes,
    studentId,
    closeModel,
}: StudentHistoryProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);

    const [expandedSubject, setExpandedSubject] = useState<String | undefined>(
        undefined
    );

    const theme = useTheme();

    useEffect(() => {
        setIsLoading(true);
        ClassApi.findByStudent(studentId).then((res) => {
            setIsLoading(false);
            mapSubjectsByStudent(res.data);
        });
    }, [studentId]);

    const mapSubjectsByStudent = (classes: any[]) => {
        const subIds = _.uniqBy(classes.map((c) => c.subjectId));
        setSubjects(
            subIds.map((subId) => {
                const subject = {
                    id: classes.find((c) => c.subjectId === subId)?.subjectId,
                    name: classes.find((c) => c.subjectId === subId)?.subject,
                };
                return {
                    ...subject,
                    classes: classes
                        .filter((c) => c.subjectId === subId)
                        .map((c) => ({ ...c, teacher: { name: c.teacher } })),
                };
            })
        );
    };

    const getColor = (subject: any) => {
        const c = subject.classes[0];

        if (c.validated || c.grade >= 2) return '#a5e8a5cf';
        if (!c.validated && (c.grade === null || c.grade === undefined))
            return '#def0ff';
        if ((!c.grade || c.grade < 2) && !c.validated) return '#ffa7a7';
        else return '#def0ff';
    };

    const getGrade = (subject) => {
        const c = subject.classes[0];
        if (c.validated) return `Calificación: Validado por otra institución`;
        if (c.grade >= 2) return `Calificación: ${c.grade} - Aprobado`;
        if (c.grade === null || c.grade === undefined) return 'A cursar';
        if (!c.grade || c.grade < 2)
            return `Calificación: ${c.grade} - Reprobado`;
    };

    const renderSubjectCard = (subject: any, index) => {
        return (
            <ExpansionPanel
                className={classes.subjectCard}
                style={{ background: getColor(subject), marginBottom: 10 }}
                expanded={expandedSubject === subject.id}
                onChange={() =>
                    setExpandedSubject((id) =>
                        id === subject.id || subject.classes?.length <= 1
                            ? undefined
                            : subject.id
                    )
                }
                key={index}
            >
                <ExpansionPanelSummary expandIcon={<ArrowForwardIcon />}>
                    <Box display="flex" flexDirection="column">
                        <Typography>{subject.name}</Typography>
                        <Typography style={{ color: 'gray' }}>
                            ({subject.classes[0].teacher?.name || '-'})
                        </Typography>
                        <Typography>{getGrade(subject)}</Typography>
                    </Box>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails classes={{ root: classes.expansion }}>
                    <List component="nav" style={{ width: '100%' }}>
                        {subject.classes.map((c) => (
                            <ListItem
                                key={c.id}
                                button
                                style={{ width: '100%' }}
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

    const getModalContent = () => {
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
    };

    return (
        <Modal
            title="Historico"
            onCancel={closeModel}
            fullHeight
            isOpen
        >
            {getModalContent()}
        </Modal>
    );
}

export default withStyles(styles)(StudentHistory);
