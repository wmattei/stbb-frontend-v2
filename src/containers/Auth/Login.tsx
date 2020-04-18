import React, { useState, useEffect } from 'react';
import { useForm } from 'react-form';
import RoundedField from '../../components/RoundedInput';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Box, Button } from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AuthApi from '../../api/authApi';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout, setCurrentUser } from '../../store/actions/authActions';
import { trackPromise } from 'react-promise-tracker';

export function Login() {
    const history = useHistory();
    const dispatch = useDispatch();

    const fetchMe = async () => {
        const result = await trackPromise(AuthApi.whoami());

        if (result.status === 200 && result.data) {
            dispatch(setCurrentUser(result.data.data));
        }

        if (result.status === 401) {
            history.replace('/login');
        }
    };

    useEffect(() => {
        dispatch(logout());
        // eslint-disable-next-line
    }, []);

    const onSubmit = (values) => {
        trackPromise(
            AuthApi.login(values.email, values.password).then((res) => {
                localStorage.setItem('token', res.data.data.accessToken);
                dispatch(login());
                fetchMe();
                history.push('/');
            })
        );
    };

    const { Form, values } = useForm({
        onSubmit,
    });
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <Form>
                <Box py={1}>
                    <RoundedField
                        label="E-mail"
                        field="email"
                        type="email"
                        startIcon={<MailOutlineIcon />}
                    />
                </Box>
                <Box py={1}>
                    <RoundedField
                        label="Contraseña"
                        field="password"
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
                        disabled={!values.email || !values.password}
                        style={{ width: '100%' }}
                        variant="contained"
                        type="submit"
                        color="primary"
                    >
                        LOGIN
                    </Button>
                </Box>
            </Form>
        </div>
    );
}
