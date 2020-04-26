import { Select, FormControl, InputLabel, Box } from '@material-ui/core';
import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

export function SelectInput({ name, spacing, label, children, ...rest }: any) {
    const inputRef: any = useRef(null);
    const { fieldName, defaultValue, registerField } = useField(name);

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
                <FormControl style={{ width: '100%' }}>
                    <InputLabel style={{ paddingLeft: 15 }}>{label}</InputLabel>
                    <Select
                        defaultValue={defaultValue}
                        native //! TODO  Fix remove the native flag (When not native the reference doesn't work)
                        variant="outlined"
                        inputProps={{
                            ref: inputRef,
                        }}
                        {...rest}
                    >
                        {children}
                    </Select>
                </FormControl>
            </Box>
        </>
    );
}
