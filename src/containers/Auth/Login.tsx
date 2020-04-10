import React from 'react';
import { useForm } from 'react-form';
import RoundedField from '../../components/RoundedInput';

export function Login() {
    const onSubmit = (values, instance) => {
        console.log(values);
        console.log(instance);
    };

    const { Form } = useForm({
        onSubmit,
        debugForm: true
    });

    return (
        <div>
            <Form>
                <RoundedField label="E-mail" field="email" />
            </Form>
        </div>
    );
}
