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
} from '@material-ui/core';
import { Subject } from '../../constants/types';
import { useHistory } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PeopleIcon from '@material-ui/icons/People';

type SubjectListProps = {
    classes: any;
    subjects: Subject[];
};

function SubjectList({ classes, subjects }: SubjectListProps) {
    const history = useHistory();
    const [expandedSubject, setExpandedSubject] = useState<String | undefined>(
        undefined
    );
    const theme = useTheme();

    const renderSubjectCard = (subject: any, index) => {
        console.log(subject);
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
                    <Box display="flex" flexDirection="column">
                        <Typography>{subject.name}</Typography>
                        <Typography style={{ color: 'gray' }}>
                            ({subject.classes[0].teacher.name})
                        </Typography>
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

export default withStyles(styles)(SubjectList);
