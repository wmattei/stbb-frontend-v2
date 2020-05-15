import React, { useState } from 'react';
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
import { User } from '../../constants/types';

type GradeFormProps = {
    classes: any;
    student: User;
};

function GradeForm({ classes, student }: GradeFormProps) {
    const [validated, setValidated] = useState(false);
    const [grade, setGrade] = useState<any>(null);
        
    return (
        <Card variant="elevation" style={{ marginBottom: 16 }}>
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
                </Box>
                <Box display="flex" flexDirection="row">
                    <Button variant="contained" color="secondary">
                        SALVAR
                    </Button>
                </Box>
            </Box>
        </Card>
    );
}

export default withStyles(styles)(GradeForm);
