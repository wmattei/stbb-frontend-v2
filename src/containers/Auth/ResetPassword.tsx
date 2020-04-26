import { Box, Button, withStyles } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Form } from '@unform/web';
import React, { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { useHistory, useParams } from 'react-router-dom';
import AuthApi from '../../api/authApi';
import RoundedField from '../../components/RoundedInput';
import { logout } from '../../store/actions/authActions';
import styles from './styles';

function ResetPassword({ classes }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const params: any = useParams();

    useEffect(() => {
        dispatch(logout());
        // eslint-disable-next-line
    }, []);

    const onSubmit = (values) => {
        if (
            !values.password ||
            !values.passwordConfirmation ||
            values.password !== values.passwordConfirmation
        ) {
            toastr.error('La contraseña no coincide con su confirmación');
            return;
        }
        trackPromise(
            AuthApi.reset({ ...values, token: params.token }).then((res) => {
                history.push('/auth/login');
            })
        );
    };

    return (
        <div>
            <Box display="flex" justifyContent="center">
                <b>Elige una nueva contraseña</b>
            </Box>
            <Form onSubmit={onSubmit}>
                <Box py={1}>
                    <RoundedField
                        spacing={{ my: 2 }}
                        required
                        label="Contraseña"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        startIcon={<VpnKeyIcon />}
                        endIcon={
                            showPassword ? (
                                <VisibilityOffIcon
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <VisibilityIcon
                                    onClick={() => setShowPassword(true)}
                                />
                            )
                        }
                    />
                    <RoundedField
                        spacing={{ my: 2 }}
                        required
                        label="Confirmación de contraseña"
                        name="passwordConfirmation"
                        type={showPassword ? 'text' : 'password'}
                        startIcon={<VpnKeyIcon />}
                        endIcon={
                            showPassword ? (
                                <VisibilityOffIcon
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <VisibilityIcon
                                    onClick={() => setShowPassword(true)}
                                />
                            )
                        }
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
        </div>
    );
}

export default withStyles(styles)(ResetPassword);
