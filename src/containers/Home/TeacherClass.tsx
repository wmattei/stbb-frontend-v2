import React, { useEffect, useState } from 'react';
import styles from './styles';
import {
    withStyles,
    Typography,
    Box,
    AppBar,
    Tabs,
    Tab,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
    setTitle,
    setBackButtonVisibility,
} from '../../store/actions/appActions';
import AlertCard from '../../components/AlertCard';
import InfoIcon from '@material-ui/icons/Info';
import ClassApi from '../../api/classApi';
import { useParams } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { Class } from '../../constants/types';
import DocumentList from './DocumentList';

type TeacherSubjectProps = {
    classes: any;
};

function TeacherClass({ classes }: TeacherSubjectProps) {
    const dispatch = useDispatch();
    const [currentClass, setCurrentClass] = useState<Class | null>(null);
    const [currentTab, setCurrentTab] = useState<string>('documents');

    const routeParams = useParams<any>();

    useEffect(() => {
        trackPromise(
            ClassApi.findById(routeParams.classId).then((c) => {
                dispatch(setTitle(`${c.subject.name} - ${c.name}`));
                dispatch(setBackButtonVisibility(true));
                setCurrentClass(c);
            })
        );
        // eslint-disable-next-line
    }, []);
    
    const documentSorter = (a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1
    }
    
    const addDocument = (file, description) =>{
        
    };
    
    return (
        <>
            <AppBar position="static" color="secondary">
                <Tabs
                    value={currentTab}
                    onChange={(e, value) => setCurrentTab(value)}
                >
                    <Tab
                        label={`Documentos (${
                            currentClass ? currentClass?.documents?.length : 0
                        })`}
                        value="documents"
                    />
                    <Tab
                        label={`Alumnos (${
                            currentClass ? currentClass?.students?.length : 0
                        })`}
                        value="students"
                    />
                </Tabs>
            </AppBar>
            {currentTab === 'documents' && (
                <Box p={3}>
                    {currentClass?.documents?.length ? (
                        <DocumentList documents={currentClass?.documents?.sort(documentSorter)} addDocument={addDocument} />
                    ) : (
                        <AlertCard
                            backgroundColor="#feb32a40"
                            iconBgColor="#ffb32a"
                            icon={<InfoIcon color="disabled" />}
                        >
                            <Typography>
                                Este es su aula, use este entorno para
                                proporcionar materiales y responder preguntas de
                                sus alumnos
                            </Typography>
                        </AlertCard>
                    )}
                </Box>
            )}
            {currentTab === 'students' && <div>Alumnos</div>}
        </>
    );
}

export default withStyles(styles)(TeacherClass);
