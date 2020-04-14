import React, { useState } from 'react';
import { useForm } from 'react-form';
import RoundedField from '../../components/RoundedInput';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Box, Button } from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AuthApi from '../../api/authApi';
import { setup } from '../../api/config';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/authActions';

export function Login() {
    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        AuthApi.login(values.email, values.password).then((res) => {
            setup(res.data.accessToken);
            dispatch(login());
            history.push('/');
        });
    };

    const { Form } = useForm({
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
