import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const styles = () => ({
    content: {
        '& .MuiDialogContent-root': {
            paddingTop: 8,
            paddingBottom: 18,
        },
    },
    closeButton: {
        position: 'absolute',
        right: 6,
        top: 6,
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 20,
    },
});

const DialogFullHeight = withStyles(() => ({
    paper: {
        height: '100%',
    },
}))(MuiDialog);

type ModalProps = {
    onConfirm?: any;
    confirmLabel?: string;
    actions?: Array<any>;
    onCancel?: any;
    cancelLabel?: string;
    classes?: any;
    fullHeight?: boolean;
    size?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
    isOpen: boolean;
    id?: string;
    titleStyle?: any;
    title?: string;
    hideCloseIcon?: any;
    children?: any;
};

function Modal({
    onConfirm,
    confirmLabel,
    actions,
    onCancel,
    cancelLabel,
    classes,
    fullHeight,
    size,
    isOpen,
    id,
    titleStyle,
    title,
    hideCloseIcon,
    children,
}: ModalProps) {
    const renderActions = () => {
        const buttons: any[] = [];
        if (onConfirm) {
            buttons.push(
                <Button
                    variant="contained"
                    color="primary"
                    key="confirm"
                    onClick={onConfirm}
                >
                    {confirmLabel || 'Confirmar'}
                </Button>
            );
        }
        if (actions) {
            actions.forEach((action) => {
                buttons.push(
                    <Button
                        style={{
                            backgroundColor: '#373536',
                            borderRadius: 0,
                            color: 'white',
                        }}
                        key="confirm"
                        onClick={action.action}
                    >
                        {action.label}
                    </Button>
                );
            });
        }
        if (cancelLabel) {
            buttons.push(
                <Button
                    variant="outlined"
                    style={{
                        borderColor: '#575A64',
                        color: '#575A64',
                        textTransform: 'none',
                    }}
                    key="cancel"
                    onClick={onCancel}
                >
                    {cancelLabel || 'Cancelar'}
                </Button>
            );
        }
        return buttons;
    };

    const Dialog = fullHeight ? DialogFullHeight : MuiDialog;
    return (
        <Dialog
            fullWidth
            maxWidth={size || 'xl'}
            open={isOpen}
            onClose={onCancel}
            aria-labelledby={id}
        >
            <DialogTitle id={id}>
                <Typography style={{ fontSize: 18, ...titleStyle }}>
                    {title}
                </Typography>
                {hideCloseIcon ? (
                    ''
                ) : (
                    <IconButton
                        className={classes.closeButton}
                        onClick={onCancel}
                    >
                        <Close />
                    </IconButton>
                )}
            </DialogTitle>
            <div
                className={classes.content}
                style={{ height: fullHeight ? '100vh' : 'auto' }}
            >
                <DialogContent>{children}</DialogContent>
            </div>
            <DialogActions>{renderActions()}</DialogActions>
        </Dialog>
    );
}

export default withStyles(styles as any)(Modal);
