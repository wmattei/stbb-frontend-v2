import React, { useState, useEffect } from 'react';
import styles from './styles';
import {
    withStyles,
    Card,
    Box,
    FormControl,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
} from '@material-ui/core';
import { UserRoleEnum } from '../../constants/types';
import { UserApi } from '../../api/userApi';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/selectors/authSelector';

type GradeFormProps = {
    classes: any;
    student: any;
    classId: string;
};

function GradeForm({ classes, student, classId }: GradeFormProps) {
    const [validated, setValidated] = useState(false);
    const [grade, setGrade] = useState<any>(null);
    const [id, setId] = useState(undefined);

    const currentUser = useSelector(getCurrentUser);

    const isAdmin = currentUser.role === UserRoleEnum.ADMIN;

    useEffect(() => {
        setGrade(student.grade);
        setValidated(student.validated || false);
        setId(student.gradeId);
    }, [student]);

    const saveGrade = () => {
        UserApi.saveGrade({
            student: student.id,
            class: classId,
            id: id || undefined,
            grade,
            validated,
        });
    };

    const getColor = () => {
        if (!isAdmin) return '#def0ff';
        if (validated || grade >= 2) return '#a5e8a5cf';
        if (!validated && (grade === null || grade === undefined)) return '#def0ff';
        if ((!grade || grade < 2) && !validated) return '#ffa7a7';
        else return '#def0ff';
    };

    return (
        <Card
            variant="elevation"
            style={{ marginBottom: 16, background: getColor() }}
        >
            <Box
                p={4}
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
                alignContent="center"
                alignItems="center"
            >
                <Box
                    justifyContent="space-between"
                    display="flex"
                    flexDirection="row"
                    alignContent="center"
                    alignItems="center"
                >
                    <Box display="flex" flexDirection="column">
                        <b>{student.name}</b>
                        <span>{student.email}</span>
                    </Box>
                    {isAdmin && (
                        <Box ml={2}>
                            <FormControl>
                                <TextField
                                    disabled={validated}
                                    type="number"
                                    value={grade || ''}
                                    onChange={(e) => setGrade(+e.target.value)}
                                    variant="outlined"
                                    placeholder="Nota"
                                ></TextField>
                            </FormControl>
                            <FormControlLabel
                                style={{ marginLeft: 16 }}
                                control={
                                    <Checkbox
                                        checked={validated}
                                        onChange={(e, value) => {
                                            setValidated(value);
                                            if (value) {
                                                setGrade(null);
                                            }
                                        }}
                                        name="gilad"
                                    />
                                }
                                label="Validado"
                            />
                        </Box>
                    )}
                </Box>
                {isAdmin && (
                    <Box display="flex" flexDirection="row">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => saveGrade()}
                        >
                            SALVAR
                        </Button>
                    </Box>
                )}
            </Box>
        </Card>
    );
}

export default withStyles(styles)(GradeForm);
