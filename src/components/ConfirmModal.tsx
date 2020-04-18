import React from 'react';
import Modal from './Modal';
import { Typography } from '@material-ui/core';

type ConfirmModalProps = {
    title: string;
    message: string;
    onConfirm: any;
    isOpen: boolean;
    onCancel?: any;
    confirmLabel?: string;
    cancelLabel?: string;
};

function ConfirmModal({
    title,
    message,
    onConfirm,
    isOpen,
    onCancel,
    confirmLabel,
    cancelLabel,
}: ConfirmModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            id="confirmModal"
            title={title || ''}
            confirmLabel={confirmLabel || 'Confirmar'}
            onConfirm={onConfirm}
            onCancel={onCancel}
            cancelLabel={cancelLabel || 'Cancelar'}
            size="xs"
        >
            <Typography>{message}</Typography>
        </Modal>
    );
}

export default ConfirmModal;
