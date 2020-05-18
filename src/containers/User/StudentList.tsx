import { Box, withStyles } from '@material-ui/core';
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

    useEffect(() => {
        UserApi.getStudentsByClassId(classId).then((res) => {
            setStudents(res.data);
        });
    }, [classId]);

    return (
        <Box p={3}>
            {students.map((student) => (
                <GradeForm student={student} classId={classId} />
            ))}
        </Box>
    );
}

export default withStyles(styles)(StudentList);
