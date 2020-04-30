import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { toBase64 } from '../helpers/fileHelpers';
import { Box, CircularProgress, Card } from '@material-ui/core';
import { UserApi } from '../api/userApi';
import { trackPromise } from 'react-promise-tracker';

type ImageCropperProps = {
    onClose: any;
    file: any;
    onCropFinish: any;
};

function ImageCropper({ onClose, file, onCropFinish }: ImageCropperProps) {
    const [crop, setCrop] = useState<any>({ width: 50, height: 50, unit: '%' });
    const [originalSize, setOriginalSize] = useState<any>();
    const [src, setSrc] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        toBase64(file).then(setSrc);
        // eslint-disable-next-line
    }, []);

    const onCrop = () => {
        setIsLoading(true);
        trackPromise(
            UserApi.uploadAvatar(file, { ...crop, ...originalSize }).then(
                (res) => {
                    setIsLoading(false);
                    onCropFinish(res.data);
                }
            )
        );
    };

    const onImageLoaded = (image) => {
        setOriginalSize({
            originalWidth: image.width,
            originalHeight: image.height,
        });
    };

    return (
        <Modal
            isOpen={true}
            title="Ajustar foto"
            confirmLabel="Salvar"
            cancelLabel="Cancelar"
            onCancel={onClose}
            onConfirm={!isLoading ? () => onCrop() : null}
        >
            <Box
                display="flex"
                justifyContent="center"
                style={{ maxHeight: '70%' }}
            >
                {!isLoading ? (
                    <ReactCrop
                        onImageLoaded={onImageLoaded}
                        circularCrop
                        src={src}
                        crop={crop}
                        onChange={(newCrop) => setCrop(newCrop)}
                    />
                ) : (
                    <Card style={{ width: '100%' }}>
                        <Box p={3} display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                    </Card>
                )}
            </Box>
        </Modal>
    );
}

export default ImageCropper;
