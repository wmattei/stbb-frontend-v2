import {
    Box,
    Button,
    Card,
    Typography,
    useMediaQuery,
    useTheme,
    withStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { formatRelative } from 'date-fns';
import { es } from 'date-fns/locale';
import React from 'react';
import { FileModel } from '../../constants/types';
import styles from './styles';
type DocumentListProps = {
    classes: any;
    documents: FileModel[];
    addDocument: Function;
};

function DocumentList({ classes, documents, addDocument }: DocumentListProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const getPreview = (document: FileModel) => {
        if (document.mimeType?.endsWith('pdf')) {
            return <PictureAsPdfIcon />;
        }
        if (document.mimeType?.startsWith('image')) {
            return <img style={{objectFit: 'cover'}} alt={document.name} src={document.originalPath} width="50" height="50" />;
        }
    };

    return (
        <div>
            {documents.map((document) => {
                return (
                    <Card
                        key={document.id}
                        variant="elevation"
                        className={classes.documentCard}
                    >
                        <Box
                            p={2}
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                        >
                            {!isMobile && (
                                <Box mr={2}>{getPreview(document)}</Box>
                            )}
                            <Box display="flex" flexDirection="column">
                                <Box display="flex" flexDirection="row">
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                    >
                                        <Box display="flex" flexDirection="row">
                                            <Typography
                                                variant="caption"
                                                className={classes.caption}
                                            >
                                                Subido en:
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                className={classes.createdAt}
                                            >
                                                {formatRelative(
                                                    new Date(
                                                        document.createdAt as any
                                                    ),
                                                    new Date(),
                                                    { locale: es }
                                                )}
                                            </Typography>
                                        </Box>
                                        <Typography variant="subtitle2">
                                            {document.name}
                                        </Typography>
                                    </Box>
                                    <Box ml={2}>
                                        <Button
                                            variant="outlined"
                                            className={classes.downloadBtn}
                                            onClick={() =>
                                                (window.location.href =
                                                    document.originalPath || '')
                                            }
                                        >
                                            {!isMobile && <span>DOWNLOAD</span>}
                                            <GetAppIcon color="action" />
                                        </Button>
                                        <Button
                                            variant="contained"
                                            className={classes.deleteButton}
                                        >
                                            {!isMobile && (
                                                <span
                                                    className={classes.tcWhite}
                                                >
                                                    ELIMINAR
                                                </span>
                                            )}
                                            <DeleteIcon
                                                className={classes.tcWhite}
                                            />
                                        </Button>
                                    </Box>
                                </Box>
                                <Typography>
                                    {document.description || '-'}
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                );
            })}
            <Button variant="contained" color="primary">
                SUBIR NUEVO DOCUMENTO
            </Button>
        </div>
    );
}

export default withStyles(styles)(DocumentList);
