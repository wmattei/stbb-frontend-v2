import React, { useState, useEffect } from 'react';
import styles from './styles';
import {
    withStyles,
    TextField,
    Box,
    Button,
    CircularProgress,
    Card,
    Avatar,
    Typography,
} from '@material-ui/core';
import Modal from '../../components/Modal';
import NotFound from '../../components/NotFound';
import CommentApi from '../../api/commentApi';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { format } from 'date-fns';
import { Pagination } from '../../constants/types';

type CommentsProps = {
    classes: any;
    onCancel: any;
    documentId: string;
};

function Comments({ classes, onCancel, documentId }: CommentsProps) {
    const [text, setText] = useState('');
    const [comments, setComments] = useState<any>([]);
    const [params, setParams] = useState({
        take: 10,
        page: 1,
    });
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loadedItems, setLoadedItems] = useState<number>(0);
    const { promiseInProgress } = usePromiseTracker();

    const saveComment = () => {
        CommentApi.createDocumentComment({
            text,
            ownerId: documentId,
            ownerTable: 'stbb_file_model',
        }).then(() => {
            search();
        });
    };

    useEffect(() => {
        search();
        // eslint-disable-next-line
    }, [documentId]);
    const search = (p = params) => {
        trackPromise(
            CommentApi.listCommentsByDocument(
                documentId,
                p.take,
                p.page
            ).then((res) => {
                setLoadedItems(loadedItems + res.meta.itemCount);
                console.log(res.meta.page);
                if (pagination  && res.meta.currentPage > pagination?.currentPage) {
                    setComments([...comments, ...res.data]);
                } else {
                    setComments(res.data);
                }
                setPagination(res.meta);
                setText('');
            })
        );
    };
    return (
        <Modal isOpen={true} title="Comentarios" fullHeight onCancel={onCancel}>
            <Box display="flex" flexDirection="row">
                <TextField
                    multiline
                    variant="outlined"
                    fullWidth
                    rows={4}
                    placeholder="Ingrese un comentario"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                ></TextField>
                <Button
                    disabled={!text}
                    variant="contained"
                    onClick={saveComment}
                >
                    {!promiseInProgress && <span>ENVIAR</span>}
                    {promiseInProgress && <CircularProgress size={25} />}
                </Button>
            </Box>
            <Box mt={3}>
                {comments.map((comment: any) => (
                    <Card
                        variant="elevation"
                        style={{ background: '#b6ddff', marginBottom: 10 }}
                    >
                        <Box
                            p={2}
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                        >
                            <Avatar src={comment.createdBy.avatar} />
                            <Box
                                style={{ marginLeft: 10 }}
                                display="flex"
                                flexDirection="column"
                            >
                                <Box display="flex" flexDirection="row">
                                    <b style={{ marginRight: 10 }}>
                                        {comment.createdBy.name}
                                    </b>
                                    <small>
                                        {format(
                                            new Date(comment.createdAt),
                                            'dd/MM/yyyy HH:mm'
                                        )}
                                    </small>
                                </Box>
                                <Typography>{comment.text}</Typography>
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>
            {pagination &&
                pagination.totalItems > loadedItems &&
                !promiseInProgress && (
                    <Box display="flex" justifyContent="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setParams({ ...params, page: params.page + 1 });
                                search({ ...params, page: params.page + 1 });
                            }}
                        >
                            <Typography>Ver más</Typography>
                        </Button>
                    </Box>
                )}
            {!comments.length && !promiseInProgress && (
                <NotFound message="Sin mensajes" color="#e2e2e2" />
            )}
            {promiseInProgress && (
                <Box m={3} display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            )}
        </Modal>
    );
}

export default withStyles(styles)(Comments);
