import { Avatar, Box, Button, Card, withStyles } from '@material-ui/core';
import { Form } from '@unform/web';
import React, { useEffect, useRef, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useDispatch, useSelector } from 'react-redux';
import { UserApi } from '../../api/userApi';
import ImageCropper from '../../components/ImageCropper';
import RoundedField from '../../components/RoundedInput';
import { SelectInput } from '../../components/SelectInput';
import { User, UserRoleEnum } from '../../constants/types';
import { setTitle } from '../../store/actions/appActions';
import { getCurrentUser } from '../../store/selectors/authSelector';
import styles from './styles';
import * as Yup from 'yup';
import { toastr } from 'react-redux-toastr';
import useKey from 'react-use-key';

type ProfileProps = {
    classes: any;
};

function Profile({ classes }: ProfileProps) {
    const [croppedImg, setCroppedImg] = useState(null);
    useKey('ctrl+Enter', () => onSubmit(), null);

    const onSubmit = async (avatar = croppedImg) => {
        const values = formRef.current.getData();

        const schema = Yup.object().shape({
            email: Yup.string().email().required('E-mail es obligatório'),
            name: Yup.string().required('Nombre es obligatório'),
            document: Yup.string().required('Documento es obligatório'),
            password: values.password
                ? Yup.string().min(
                      6,
                      'La contraseña debe tener más de 6 letras o números'
                  )
                : Yup.string(),
            passwordConfirmation: values.password
                ? Yup.string().required(
                      'La confirmación de contraseña es obligatória'
                  )
                : Yup.string(),
        });
        try {
            await schema.validate(values, {
                abortEarly: false,
            });

            if (
                values.password &&
                values.password !== values.passwordConfirmation
            ) {
                const message = 'La contraseña no coincide con su confirmación';
                formRef.current.setErrors({
                    password: message,
                    passwordConfirmation: message,
                });
                toastr.error(message);
                return;
            }

            trackPromise(
                UserApi.updateMe({
                    ...values,
                    avatar,
                })
            );
        } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
                toastr.error(
                    Object.values(validationErrors).reduce(
                        (str, error) => (str += error + '\n'),
                        ''
                    )
                );
            }
        }
    };

    const [isCropperOpen, setIsCropperOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('STBB'));
    }, [dispatch]);

    const currentUser: User = useSelector(getCurrentUser);

    const isStudent = currentUser && currentUser.role === UserRoleEnum.STUDENT;

    const photoRef = useRef<any>();
    const formRef = useRef<any>();

    const [file, setFile] = useState(null);

    useEffect(() => {
        formRef.current.setData({
            ...currentUser,
            birthdate: currentUser.birthdate?.toString().substring(0, 10),
        });
    }, [currentUser]);

    const onOpenImage = (e) => {
        setFile(e.target.files[0]);
        setIsCropperOpen(true);
    };

    const renderAvatar = () => {
        return (
            <Box display="flex" width="100%" justifyContent="center">
                <Avatar
                    onClick={() => photoRef?.current?.click()}
                    className={classes.avatar}
                    src={croppedImg || currentUser.avatar}
                    alt={currentUser.name}
                />
                <input
                    type="file"
                    hidden
                    ref={photoRef}
                    onChange={onOpenImage}
                    accept="image/*"
                />
                {isCropperOpen && file && (
                    <ImageCropper
                        file={file}
                        onClose={() => setIsCropperOpen(false)}
                        onCropFinish={(url) => {
                            setCroppedImg(url);
                            setIsCropperOpen(false);
                            onSubmit(url);
                        }}
                    />
                )}
            </Box>
        );
    };

    return (
        <>
            <Form onSubmit={() => onSubmit()} ref={formRef}>
                <Box p={2} display="flex" flexDirection="column">
                    {renderAvatar()}
                    <Card variant="elevation" style={{ marginTop: 20 }}>
                        <Box p={3}>
                            <RoundedField
                                required
                                spacing={{ py: 1 }}
                                label="E-mail"
                                name="email"
                                type="email"
                            />
                            <RoundedField
                                spacing={{ py: 1 }}
                                label="Contraseña"
                                name="password"
                                type="password"
                            />
                            <RoundedField
                                spacing={{ py: 1 }}
                                label="Confirmación de contraseña"
                                name="passwordConfirmation"
                                type="password"
                            />
                            <RoundedField
                                required
                                spacing={{ py: 1 }}
                                label="Nombre"
                                name="name"
                            />
                            <RoundedField
                                required
                                spacing={{ py: 1 }}
                                label="Documento"
                                name="document"
                            />
                            {isStudent && (
                                <>
                                    <RoundedField
                                        spacing={{ py: 1 }}
                                        label="País"
                                        name="country"
                                    />
                                    <RoundedField
                                        spacing={{ py: 1 }}
                                        label="Nombre del padre"
                                        name="fathersName"
                                    />
                                    <RoundedField
                                        spacing={{ py: 1 }}
                                        label="Nombre de la madre"
                                        name="mothersName"
                                    />
                                    <RoundedField
                                        spacing={{ py: 1 }}
                                        label="Fecha de nacimiento"
                                        type="date"
                                        name="birthdate"
                                    />
                                    <RoundedField
                                        spacing={{ py: 1 }}
                                        label="Escolaridad"
                                        name="scholarity"
                                    />
                                    <RoundedField
                                        spacing={{ py: 1 }}
                                        label="Local de nacimiento"
                                        name="placeOfBirth"
                                    />
                                    <SelectInput
                                        spacing={{ py: 1 }}
                                        label="Genero"
                                        name="gender"
                                    >
                                        <option value="male">Hombre</option>
                                        <option value="female">Mujer</option>
                                    </SelectInput>
                                </>
                            )}
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    SALVAR
                                </Button>
                            </Box>
                        </Box>
                    </Card>
                </Box>
            </Form>
        </>
    );
}

export default withStyles(styles)(Profile);
