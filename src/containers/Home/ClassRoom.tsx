import {
    AppBar,
    Box,
    Button,
    Tab,
    Tabs,
    Typography,
    withStyles,
    Card,
    CircularProgress,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import React, { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ClassApi from '../../api/classApi';
import AlertCard from '../../components/AlertCard';
import ConfirmModal from '../../components/ConfirmModal';
import {
    setBackButtonVisibility,
    setTitle,
} from '../../store/actions/appActions';
import DocumentList from './DocumentList';
import styles from './styles';
import UploadDocument from './UploadDocument';
import { getCurrentUser } from '../../store/selectors/authSelector';
import { UserRoleEnum } from '../../constants/types';

type ClassRoomProps = {
    classes: any;
};

function ClassRoom({ classes }: ClassRoomProps) {
    const dispatch = useDispatch();
    const [currentClass, setCurrentClass] = useState<any>(null);
    const [currentTab, setCurrentTab] = useState<string>('documents');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [deletedRequestDocumentId, setDeletedRequestDocumentId] = useState(
        null
    );
    const [isLoading, setIsLoading] = useState(false);

    const currentUser = useSelector(getCurrentUser);

    const isTeacher =
        currentUser.role === UserRoleEnum.TEACHER ||
        currentUser.role === UserRoleEnum.ADMIN;

    const routeParams = useParams<any>();

    useEffect(() => {
        setIsLoading(true);
        trackPromise(
            ClassApi.findById(routeParams.classId).then((c) => {
                dispatch(setTitle(`${c.subject.name} - ${c.name}`));
                dispatch(setBackButtonVisibility(true));
                setCurrentClass(c);
                setIsLoading(false);
            })
        );
        // eslint-disable-next-line
    }, []);

    const documentSorter = (a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1;
    };

    const addNewDocument = (document) => {
        const newDocuments = [document, ...(currentClass?.documents || [])];
        setCurrentClass({ ...currentClass, documents: newDocuments });
        setIsFormOpen(false);
    };

    const onDeleteRequest = (document) => {
        setDeletedRequestDocumentId(document);
    };

    const deleteDocument = () => {
        const id = deletedRequestDocumentId;
        setDeletedRequestDocumentId(null);
        trackPromise(
            ClassApi.deleteDocument(id).then(() => {
                const newDocuments = currentClass?.documents.filter(
                    (doc) => doc.id !== id
                );
                setCurrentClass({ ...currentClass, documents: newDocuments });
            })
        );
    };

    const getTotalStudents = () => {
        if (!currentClass) return 0;
        return isTeacher
            ? currentClass?.students?.length
            : currentClass?.students?.length - 1;
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
                        disabled
                        label={`${
                            isTeacher ? 'Alumnos' : 'Compañeros'
                        } (${getTotalStudents()})`}
                        value="students"
                    />
                </Tabs>
            </AppBar>
            {currentTab === 'documents' && (
                <Box p={2}>
                    {!!currentClass?.documents?.length && !isLoading && (
                        <DocumentList
                            documents={currentClass?.documents?.sort(
                                documentSorter
                            )}
                            onDelete={onDeleteRequest}
                            isTeacher={isTeacher}
                        />
                    )}
                    {!currentClass?.documents?.length && !isLoading && (
                        <Box p={2}>
                            <AlertCard
                                backgroundColor="#feb32a40"
                                iconBgColor="#ffb32a"
                                icon={<InfoIcon color="disabled" />}
                            >
                                {isTeacher ? (
                                    <Typography>
                                        Este es su aula, use este entorno para
                                        proporcionar materiales y responder
                                        preguntas de sus alumnos
                                    </Typography>
                                ) : (
                                    <Typography>
                                        Este es su aula, use este entorno para
                                        descargar los materiales que su maestro
                                        pone a disposición y hacer preguntas a
                                        él
                                    </Typography>
                                )}
                            </AlertCard>
                        </Box>
                    )}
                    {!currentClass?.documents?.length && isLoading && (
                        <Box
                            m={2}
                            width="100%"
                            display="flex"
                            justifyContent="center"
                        >
                            <Card style={{ width: '100%' }}>
                                <Box
                                    p={3}
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <CircularProgress />
                                </Box>
                            </Card>
                        </Box>
                    )}
                    {isTeacher && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIsFormOpen(true)}
                        >
                            SUBIR NUEVO DOCUMENTO
                        </Button>
                    )}
                    <UploadDocument
                        isOpen={isFormOpen}
                        close={() => setIsFormOpen(false)}
                        onSave={addNewDocument}
                        classId={currentClass && currentClass.id}
                    />
                    <ConfirmModal
                        title="Eliminar documento"
                        message="Estás seguro que deses eliminar este documento"
                        isOpen={!!deletedRequestDocumentId}
                        cancelLabel="Cancelar"
                        confirmLabel="Eliminar"
                        onConfirm={deleteDocument}
                        onCancel={() => setDeletedRequestDocumentId(null)}
                    />
                </Box>
            )}
            {currentTab === 'students' && <div>Alumnos</div>}
        </>
    );
}

export default withStyles(styles)(ClassRoom);
