import React, { useState, useEffect } from 'react';
import styles from './styles';
import { withStyles, Box, Card } from '@material-ui/core';
import { UserApi } from '../../api/userApi';
import GradeForm from './GradeForm';

type StudentListProps = {
    classes: any;
    classId: string;
};

function StudentList({ classes, classId }: StudentListProps) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        UserApi.getStudentsByClassId(classId).then((res) => {
            setStudents(res.data);
        });
    }, []);

    return (
        <Box p={3}>
            {students.map((student) => (
                <GradeForm student={student} />
            ))}
        </Box>
    );
}

export default withStyles(styles)(StudentList);
