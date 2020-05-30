import { Box, withStyles, Card, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { UserApi } from '../../api/userApi';
import GradeForm from './GradeForm';
import styles from './styles';

type StudentListProps = {
    classes: any;
    classId: string;
};

function StudentList({ classes, classId }: StudentListProps) {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        UserApi.getStudentsByClassId(classId).then((res) => {
            setIsLoading(false);
            setStudents(res.data);
        });
    }, [classId]);

    if (isLoading) {
        return (
            <Box m={2} width="100%" display="flex" justifyContent="center">
                <Card style={{ width: '100%' }}>
                    <Box p={3} display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                </Card>
            </Box>
        );
    }

    return (
        <Box p={3}>
            {students.map((student) => (
                <GradeForm student={student} classId={classId} />
            ))}
        </Box>
    );
}

export default withStyles(styles)(StudentList);
