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
import React, { useState } from 'react';
import { FileModel } from '../../constants/types';
import styles from './styles';
import ChatIcon from '@material-ui/icons/Chat';
import Comments from './Comments';

type DocumentListProps = {
    classes: any;
    documents: FileModel[];
    onDelete: any;
    isTeacher: boolean;
};

function DocumentList({
    classes,
    documents,
    onDelete,
    isTeacher,
}: DocumentListProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [documentChatId, setDocumentChatId] = useState<any>(null);

    const getPreview = (document: FileModel) => {
        if (document.mimeType?.endsWith('pdf')) {
            return <PictureAsPdfIcon />;
        }
        if (document.mimeType?.startsWith('image')) {
            return (
                <img
                    style={{ objectFit: 'cover' }}
                    alt={document.name}
                    src={document.originalPath}
                    width="50"
                    height="50"
                />
            );
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
                            <Box mr={2}>{getPreview(document)}</Box>

                            <Box display="flex" flexDirection="column" width="100%">
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="space-between"

                                >
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="start"
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

                                        {isTeacher && (
                                            <Typography variant="subtitle2">
                                                {document.name}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Box
                                        ml={2}
                                        display="flex"
                                        flexDirection={
                                            isMobile ? 'column' : 'row'
                                        }
                                        justifyContent="flex-end"
                                    >
                                        <Button
                                            variant="outlined"
                                            className={classes.actionBtn}
                                            onClick={() =>
                                                (window.location.href =
                                                    document.originalPath || '')
                                            }
                                        >
                                            {!isMobile && <span>DOWNLOAD</span>}
                                            <GetAppIcon color="action" />
                                        </Button>
                                        {isTeacher && (
                                            <Button
                                                onClick={() =>
                                                    onDelete(document.id)
                                                }
                                                variant="contained"
                                                className={classes.deleteButton}
                                            >
                                                {!isMobile && (
                                                    <span
                                                        className={
                                                            classes.tcWhite
                                                        }
                                                    >
                                                        ELIMINAR
                                                    </span>
                                                )}
                                                <DeleteIcon
                                                    className={classes.tcWhite}
                                                />
                                            </Button>
                                        )}

                                        <Button
                                            onClick={() =>
                                                setDocumentChatId(document.id)
                                            }
                                            variant="contained"
                                            color="secondary"
                                            className={classes.actionBtn}
                                        >
                                            {!isMobile && (
                                                <span
                                                    className={classes.tcWhite}
                                                >
                                                    COMENTARIOS
                                                </span>
                                            )}
                                            <ChatIcon
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
            {documentChatId && (
                <Comments
                    onCancel={() => setDocumentChatId(null)}
                    documentId={documentChatId}
                ></Comments>
            )}
        </div>
    );
}

export default withStyles(styles)(DocumentList);
