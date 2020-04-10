import React from 'react';
import { splitFormProps, useField } from 'react-form';
import { InputAdornment, TextField } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const RoundedField = React.forwardRef(({ label, ...props }: any, ref) => {
    const [field, fieldOptions, rest] = splitFormProps(props);

    const { getInputProps } = useField(field, fieldOptions);

    return (
        <>
            <TextField
                style={{ width: '100%' }}
                label={label}
                variant="outlined"
                InputProps={{
                    ...getInputProps({ ref, ...rest }),
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
            />
            {/* <input {...getInputProps({ ref, ...rest })} />{' '}
            {isValidating ? (
                <em>Validating...</em>
            ) : isTouched && error ? (
                <em>{error}</em>
            ) : null} */}
        </>
    );
});

export default RoundedField;
