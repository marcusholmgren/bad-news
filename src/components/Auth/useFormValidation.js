import {useState, useEffect} from "react";

function useFormValidation(initialState, validate, authenticate) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
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


    function handleChange(event) {
        event.persist();
        setValues(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value
        }))
    }

    function handleBlur() {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }


    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
    }

    return { handleSubmit, handleBlur, handleChange, values, errors, isSubmitting}
}

export default useFormValidation;
