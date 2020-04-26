import React, { useRef, useEffect } from 'react';
import { InputAdornment, TextField, Box } from '@material-ui/core';
import { useField } from '@unform/core';

export default function RoundedField({
    label,
    name,
    startIcon,
    endIcon,
    spacing,
    type,
    ...props
}: any) {
    const inputRef: any = useRef(null);
    const {
        fieldName,
        defaultValue,
        registerField,
        error,
        clearError,
    } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <>
            <Box {...spacing}>
                <TextField
                    {...props}
                    error={!!error}
                    helperText={error}
                    style={{ width: '100%' }}
                    label={label}
                    variant="outlined"
                    type={type}
                    defaultValue={defaultValue}
                    inputRef={inputRef}
                    onFocus={clearError}
                    InputLabelProps={
                        type === 'date' && {
                            shrink: true,
                        }
                    }
                    InputProps={{
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
            </Box>
        </>
    );
}
