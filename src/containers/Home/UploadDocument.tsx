import {
    Box,
    Button,
    TextField,
    withStyles,
    Typography,
} from '@material-ui/core';
import React, { useRef, useState } from 'react';
import Modal from '../../components/Modal';
import styles from './styles';
import ClassApi from '../../api/classApi';
import { trackPromise } from 'react-promise-tracker';

type UploadDocumentProps = {
    classId: string;
    close: any;
    isOpen: boolean;
    onSave: any;
};

function UploadDocument({
    classId,
    isOpen,
    close,
    onSave,
}: UploadDocumentProps) {
    const upload = useRef<any>();

    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');

    const onUpload = (event: any) => {
        setFile(event.target.files[0]);
    };

    const save = () => {
        trackPromise(
            ClassApi.uploadDocument(file, description, classId).then((res) => {
                setFile(null);
                setDescription('');
                onSave(res.data);
            })
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            size="xs"
            onCancel={close}
            title="Subir documento"
            onConfirm={save}
        >
            <Box mt={2}>
                <TextField
                    style={{ width: '100%' }}
                    variant="outlined"
                    multiline
                    rows={4}
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Box mt={1}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => upload.current.click()}
                    >
                        {file ? 'Cambiar archivo' : 'Elija el archivo'}
                    </Button>
                    <Typography>{file && file?.name}</Typography>
                    <input
                        type="file"
                        hidden
                        ref={upload}
                        onChange={onUpload}
                    />
                </Box>
            </Box>
        </Modal>
    );
}

export default withStyles(styles)(UploadDocument);
