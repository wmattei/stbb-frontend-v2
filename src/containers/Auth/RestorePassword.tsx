import { Box, Button, withStyles } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Form } from '@unform/web';
import React, { useEffect, useRef } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AuthApi from '../../api/authApi';
import RoundedField from '../../components/RoundedInput';
import { logout } from '../../store/actions/authActions';
import styles from './styles';

function RestorePassword({ classes }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const formRef: any = useRef(null);

    useEffect(() => {
        dispatch(logout());
        // eslint-disable-next-line
    }, []);

    const onSubmit = (values) => {
        trackPromise(
            AuthApi.restore(values.email).then((res) => {
                history.push('/auth/login');
            })
        );
    };

    return (
        <div>
            <Box display="flex" justifyContent="center">
                <b>
                    Ingrese su correo electrónico para recibir su enlace de
                    recuperación
                </b>
            </Box>
            <Form onSubmit={onSubmit} ref={formRef}>
                <Box py={1}>
                    <RoundedField
                        label="E-mail"
                        name="email"
                        type="email"
                        startIcon={<MailOutlineIcon />}
                    />
                </Box>
                <Box py={1}>
                    <Button
                        style={{ width: '100%' }}
                        variant="contained"
                        type="submit"
                        color="primary"
                    >
                        ENVIAR
                    </Button>
                </Box>
            </Form>
            <Box display="flex" justifyContent="center">
                <span
                    onClick={() => history.push('/auth/login')}
                    className={classes.link}
                >
                    Volver al Login
                </span>
            </Box>
        </div>
    );
}

export default withStyles(styles)(RestorePassword);
