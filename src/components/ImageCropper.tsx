import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { toBase64 } from '../helpers/fileHelpers';
import { Box } from '@material-ui/core';
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

    useEffect(() => {
        toBase64(file).then(setSrc);
        // eslint-disable-next-line
    }, []);

    const onCrop = () => {
        trackPromise(
            UserApi.uploadAvatar(file, { ...crop, ...originalSize }).then(
                (res) => {
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
            onConfirm={() => onCrop()}
        >
            <Box display="flex" justifyContent="center" style={{ width: 350 }}>
                <ReactCrop
                    onImageLoaded={onImageLoaded}
                    circularCrop
                    src={src}
                    crop={crop}
                    onChange={(newCrop) => setCrop(newCrop)}
                />
            </Box>
        </Modal>
    );
}

export default ImageCropper;
