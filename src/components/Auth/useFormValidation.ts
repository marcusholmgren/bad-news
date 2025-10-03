import { useState, useEffect } from "react";
import React from 'react';

type Errors<T> = {
  [K in keyof T]?: string;
};

function useFormValidation<T>(initialState: T, validate: (values: T) => Errors<T>, authenticate: () => void) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState<Errors<T>>({});
    const [isSubmitting, setSubmitting] = useState(false);


    useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                authenticate();
                setSubmitting(false);
            } else {
             setSubmitting(false);
            }
        }
    }, [errors, isSubmitting, values, authenticate]);


    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValues(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value
        }))
    }

    function handleBlur() {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
    }

    return { handleSubmit, handleBlur, handleChange, values, errors, isSubmitting}
}

export default useFormValidation;
