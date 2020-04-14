import React from 'react';
import { splitFormProps, useField } from 'react-form';
import { InputAdornment, TextField } from '@material-ui/core';

const RoundedField = React.forwardRef(
    ({ label, startIcon, endIcon, ...props }: any, ref) => {
        const [field, fieldOptions, rest] = splitFormProps(props);

        const { getInputProps } = useField(field, fieldOptions);

        return (
            <>
                <TextField
                    style={{ width: '100%' }}
                    label={label}
                    variant="outlined"
                    {...props}
                    InputProps={{
                        ...getInputProps({ ref, ...rest }),
                        startAdornment: startIcon && (
                            <InputAdornment position="start">
                                {startIcon}
                            </InputAdornment>
                        ),
                        endAdornment: endIcon && (
                            <InputAdornment position="end">
                                {endIcon}
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
    }
);

export default RoundedField;
