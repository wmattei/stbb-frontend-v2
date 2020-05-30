import React, { useState, useEffect } from 'react';
import styles from './styles';
import {
    withStyles,
    Box,
    Card,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import NotFound from '../../components/NotFound';
import { UserApi } from '../../api/userApi';
import StudentHistory from './StudentHistory';

type StudentListHistoryProps = {
    classes: any;
};

function StudentListHistory({ classes }: StudentListHistoryProps) {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedStudent, setSelectedStudent] = useState('');

    useEffect(() => {
        setIsLoading(true);
        UserApi.getStudents().then((res) => {
            setStudents(res.data);
            setIsLoading(false);
        });
    }, []);

    const renderStudentCard = (student, index) => {
        return (
            <Card
                variant="elevation"
                style={{ marginBottom: 16, background: '#def0ff', cursor: 'pointer' }}
                onClick={() => setSelectedStudent(student.id)}
            >
                <Box
                    p={4}
                    display="flex"
                    justifyContent="space-between"
                    flexDirection="column"
                    alignContent="start"
                    alignItems="start"
                >
                    <b>{student.name}</b>
                    <Typography style={{ color: 'gray' }}>
                        ({student.isActive ? 'Activo' : 'Inactivo'})
                    </Typography>
                </Box>
            </Card>
        );
    };

    if (students.length && !isLoading)
        return (
            <Box display="flex" flexDirection="column" p={2}>
                {students.map(renderStudentCard)}

                {!!selectedStudent && (
                    <StudentHistory
                        studentId={selectedStudent}
                        closeModel={() => setSelectedStudent('')}
                    />
                )}
            </Box>
        );
    if (!students.length && !isLoading)
        return (
            <NotFound
                message="Ningún alumno encontrado!"
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

export default withStyles(styles)(StudentListHistory);
